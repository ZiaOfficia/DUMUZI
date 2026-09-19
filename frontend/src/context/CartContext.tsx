/**
 * CartContext — dual-mode cart:
 *  • Authenticated user → syncs with MySQL via /api/cart
 *  • Guest             → kept in localStorage so it survives a refresh and the
 *                        round trip to PayU, and is merged into the account
 *                        cart if the shopper logs in later
 */
import {
  createContext, useContext, useReducer, useEffect, useState, useRef, useCallback, type ReactNode,
} from 'react';
import { cartApi } from '../services/api';
import { useAuth } from './AuthContext';
import type { CartItemWithProduct } from '../types';

// ── Local guest cart item (lightweight) ──────────────────────────────────────
export interface GuestCartItem {
  id: number;          // productId used as id for guest
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// ── Unified CartItem shape exposed to components ──────────────────────────────
export type CartItem = GuestCartItem;

// ── Free gift item ────────────────────────────────────────────────────────────
// Gifts are ₹0 add-ons the customer chooses to claim. They're tracked separately
// from paid items so they never sync to the billing cart or skew the combo
// spend threshold, and are auto-removed when they stop being eligible.
export interface GiftItem {
  key: string;                    // unique per gift (source + product + anchor)
  productId: number;
  name: string;
  image: string;
  mrp: number;                    // original worth, shown struck-through
  source: 'single' | 'combo';
  buyId?: number;                 // single: qualifying product must stay in cart
  threshold?: number;             // combo: min subtotal required to keep it
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  cartRowIds: Map<number, number>; // productId → CartItem.id (DB row id) — used for update/delete
  loading: boolean;
}

type CartAction =
  | { type: 'SET_CART'; items: CartItem[]; rowIds?: Map<number, number> }
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: number }   // productId
  | { type: 'UPDATE_QTY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_LOADING'; value: boolean };

const calcTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((s, i) => s + i.quantity, 0),
  totalPrice: items.reduce((s, i) => s + i.price * i.quantity, 0),
});

// ── Guest cart storage ───────────────────────────────────────────────────────
// Guests have no server-side cart, so the browser is the only place to keep it.
// Every access is guarded: storage can be unavailable (private windows) or hold
// something stale from an older build.
const GUEST_CART_KEY = 'dumuzi_guest_cart';

const readGuestCart = (): CartItem[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(GUEST_CART_KEY) ?? 'null');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (i): i is CartItem =>
        !!i && typeof i.id === 'number' && typeof i.price === 'number' && typeof i.quantity === 'number',
    );
  } catch {
    return [];
  }
};

const writeGuestCart = (items: CartItem[]) => {
  try { localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items)); } catch { /* storage unavailable */ }
};

const clearGuestCart = () => {
  try { localStorage.removeItem(GUEST_CART_KEY); } catch { /* storage unavailable */ }
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.items,
        cartRowIds: action.rowIds ?? state.cartRowIds,
        ...calcTotals(action.items),
        loading: false,
      };
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      const items = existing
        ? state.items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { ...state, items, ...calcTotals(items) };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.id !== action.payload);
      return { ...state, items, ...calcTotals(items) };
    }
    case 'UPDATE_QTY': {
      const items = action.payload.quantity <= 0
        ? state.items.filter(i => i.id !== action.payload.id)
        : state.items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i);
      return { ...state, items, ...calcTotals(items) };
    }
    case 'CLEAR_CART':
      return { ...state, items: [], totalItems: 0, totalPrice: 0, cartRowIds: new Map() };
    case 'SET_LOADING':
      return { ...state, loading: action.value };
    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────────────────────────
interface CartContextType extends Omit<CartState, 'cartRowIds'> {
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  updateQty: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  gifts: GiftItem[];
  addGift: (gift: GiftItem) => void;
  removeGift: (key: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// ── Helper: convert DB response to unified CartItem array ─────────────────────
function dbCartToItems(apiItems: CartItemWithProduct[]): { items: CartItem[]; rowIds: Map<number, number> } {
  const rowIds = new Map<number, number>();
  const items: CartItem[] = apiItems.map(ci => {
    rowIds.set(ci.productId, ci.id); // productId → DB row id
    return {
      id:       ci.productId,
      name:     ci.product.description,
      price:    Number(ci.product.mrp),
      image:    ci.product.image,
      quantity: ci.quantity,
    };
  });
  return { items, rowIds };
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading: authLoading } = useAuth();

  // Start from whatever the browser remembered — a guest who refreshes or comes
  // back from PayU should still find their cart. Replaced by the DB cart if the
  // auth check below says they're signed in.
  const [state, dispatch] = useReducer(cartReducer, undefined, (): CartState => {
    const items = readGuestCart();
    return { items, ...calcTotals(items), cartRowIds: new Map(), loading: false };
  });

  // ── Free gifts (local, ₹0, customer-claimed) ─────────────────────────────────
  const [gifts, setGifts] = useState<GiftItem[]>([]);

  const addGift = useCallback((gift: GiftItem) => {
    setGifts(prev => prev.some(g => g.key === gift.key) ? prev : [...prev, gift]);
  }, []);

  const removeGift = useCallback((key: string) => {
    setGifts(prev => prev.filter(g => g.key !== key));
  }, []);

  // Auto-remove gifts that are no longer eligible:
  //  • single → the qualifying box was removed from the cart
  //  • combo  → the subtotal dropped below the unlocking threshold
  useEffect(() => {
    setGifts(prev => {
      const next = prev.filter(g =>
        g.source === 'single'
          ? state.items.some(i => i.id === g.buyId)
          : state.totalPrice >= (g.threshold ?? Infinity),
      );
      return next.length === prev.length ? prev : next;
    });
  }, [state.items, state.totalPrice]);

  // Tracks whether the last resolved auth state was "signed in", so we can tell
  // a logout (clear the cart) from a guest simply browsing (keep it).
  const wasAuthenticated = useRef(false);

  // When auth state resolves: load the cart from the DB, merging anything the
  // shopper added before signing in.
  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      if (wasAuthenticated.current) {
        wasAuthenticated.current = false;
        clearGuestCart();
        dispatch({ type: 'CLEAR_CART' });
      }
      return;
    }

    wasAuthenticated.current = true;
    dispatch({ type: 'SET_LOADING', value: true });

    // Hand the guest cart over to the account, then read back the merged result.
    // Cleared up front so a failed merge can't replay these items on next load.
    const pending = readGuestCart();
    clearGuestCart();

    (async () => {
      try {
        for (const item of pending) {
          await cartApi.add(item.id, item.quantity);
        }
      } catch { /* out of stock or removed — the DB cart below is the truth */ }

      try {
        const { items: apiItems } = await cartApi.get();
        const { items, rowIds } = dbCartToItems(apiItems as unknown as CartItemWithProduct[]);
        dispatch({ type: 'SET_CART', items, rowIds });
      } catch {
        dispatch({ type: 'SET_LOADING', value: false });
      }
    })();
  }, [isAuthenticated, authLoading]);

  // Mirror the guest cart to storage on every change (no-op once signed in —
  // the server holds the cart then).
  useEffect(() => {
    if (authLoading || isAuthenticated) return;
    writeGuestCart(state.items);
  }, [state.items, isAuthenticated, authLoading]);

  // ── addItem ────────────────────────────────────────────────────────────────
  const addItem = useCallback(async (item: Omit<CartItem, 'quantity'>) => {
    if (!isAuthenticated) {
      dispatch({ type: 'ADD_ITEM', payload: item });
      return;
    }
    try {
      const res = await cartApi.add(item.id);
      const { items, rowIds } = dbCartToItems(res.items as unknown as CartItemWithProduct[]);
      dispatch({ type: 'SET_CART', items, rowIds });
    } catch {
      // fallback optimistic
      dispatch({ type: 'ADD_ITEM', payload: item });
    }
  }, [isAuthenticated]);

  // ── removeItem ─────────────────────────────────────────────────────────────
  const removeItem = useCallback(async (productId: number) => {
    if (!isAuthenticated) {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
      return;
    }
    const rowId = state.cartRowIds.get(productId);
    if (rowId === undefined) return;
    try {
      const res = await cartApi.remove(rowId);
      const { items, rowIds } = dbCartToItems(res.items as unknown as CartItemWithProduct[]);
      dispatch({ type: 'SET_CART', items, rowIds });
    } catch {
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
    }
  }, [isAuthenticated, state.cartRowIds]);

  // ── updateQty ──────────────────────────────────────────────────────────────
  const updateQty = useCallback(async (productId: number, quantity: number) => {
    if (!isAuthenticated) {
      dispatch({ type: 'UPDATE_QTY', payload: { id: productId, quantity } });
      return;
    }
    const rowId = state.cartRowIds.get(productId);
    if (rowId === undefined) return;
    try {
      const res = await cartApi.update(rowId, quantity);
      const { items, rowIds } = dbCartToItems(res.items as unknown as CartItemWithProduct[]);
      dispatch({ type: 'SET_CART', items, rowIds });
    } catch {
      dispatch({ type: 'UPDATE_QTY', payload: { id: productId, quantity } });
    }
  }, [isAuthenticated, state.cartRowIds]);

  // ── clearCart ──────────────────────────────────────────────────────────────
  const clearCart = useCallback(async () => {
    setGifts([]);
    if (!isAuthenticated) {
      dispatch({ type: 'CLEAR_CART' });
      return;
    }
    try {
      await cartApi.clear();
    } catch { /* best-effort */ }
    dispatch({ type: 'CLEAR_CART' });
  }, [isAuthenticated]);

  return (
    <CartContext.Provider value={{
      items: state.items,
      totalItems: state.totalItems,
      totalPrice: state.totalPrice,
      loading: state.loading,
      addItem,
      removeItem,
      updateQty,
      clearCart,
      gifts,
      addGift,
      removeGift,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
