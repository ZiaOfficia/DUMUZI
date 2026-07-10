/**
 * CartContext — dual-mode cart:
 *  • Authenticated user → syncs with MySQL via /api/cart
 *  • Guest             → local in-memory state (migrated to DB on login)
 */
import {
  createContext, useContext, useReducer, useEffect, useCallback, type ReactNode,
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

  const [state, dispatch] = useReducer(cartReducer, {
    items: [], totalItems: 0, totalPrice: 0, cartRowIds: new Map(), loading: false,
  });

  // When auth state resolves: load cart from DB (if logged in)
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      dispatch({ type: 'CLEAR_CART' });
      return;
    }
    dispatch({ type: 'SET_LOADING', value: true });
    cartApi.get()
      .then(({ items: apiItems }) => {
        const { items, rowIds } = dbCartToItems(apiItems as unknown as CartItemWithProduct[]);
        dispatch({ type: 'SET_CART', items, rowIds });
      })
      .catch(() => dispatch({ type: 'SET_LOADING', value: false }));
  }, [isAuthenticated, authLoading]);

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
