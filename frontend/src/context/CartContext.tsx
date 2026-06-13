import { createContext, useContext, useReducer, type ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QTY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const calcTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((s, i) => s + i.quantity, 0),
  totalPrice: items.reduce((s, i) => s + i.price * i.quantity, 0),
});

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      const items = existing
        ? state.items.map(i => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { items, ...calcTotals(items) };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter(i => i.id !== action.payload);
      return { items, ...calcTotals(items) };
    }
    case 'UPDATE_QTY': {
      const items = action.payload.quantity <= 0
        ? state.items.filter(i => i.id !== action.payload.id)
        : state.items.map(i => i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i);
      return { items, ...calcTotals(items) };
    }
    case 'CLEAR_CART':
      return { items: [], totalItems: 0, totalPrice: 0 };
    default:
      return state;
  }
}

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], totalItems: 0, totalPrice: 0 });
  return (
    <CartContext.Provider value={{
      ...state,
      addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
      removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
      updateQty: (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, quantity: qty } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
