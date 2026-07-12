import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart, type CartItem } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/common/Toast';

/**
 * Auth-guarded add-to-cart, shared by every "Add to Cart" button on the site.
 * Guests are sent to /login (with a return path back to the current page)
 * so cart contents always belong to an account.
 *
 * Returns true if the item was added, false if the user was redirected to login.
 */
export function useAddToCart() {
  const { addItem }         = useCart();
  const { isAuthenticated } = useAuth();
  const { info }            = useToast();
  const navigate            = useNavigate();
  const location            = useLocation();

  return useCallback(
    (item: Omit<CartItem, 'quantity'>): boolean => {
      if (!isAuthenticated) {
        info('Please log in to add items to your cart');
        navigate('/login', { state: { from: location.pathname } });
        return false;
      }
      addItem(item);
      return true;
    },
    [isAuthenticated, addItem, navigate, info, location.pathname]
  );
}
