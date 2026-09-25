import { useCallback } from 'react';
import { useCart, type CartItem } from '../context/CartContext';
import { useGuestGate } from '../context/GuestGateContext';
import { trackAddToCart } from '../utils/metaPixel';

/**
 * Add-to-cart, shared by every "Add to Cart" button on the site.
 *
 * The very first add asks the shopper whether to sign in or buy as a guest
 * (see GuestGateContext); the item is added as soon as they pick guest, and
 * they're never asked again. After that — and for anyone already signed in —
 * the item goes straight into the cart.
 *
 * Returns true if the item went in immediately, false if the prompt was shown
 * instead, so existing call sites that branch on it keep working.
 */
export function useAddToCart() {
  const { addItem }        = useCart();
  const { ensureIdentity } = useGuestGate();

  return useCallback(
    (item: Omit<CartItem, 'quantity'>): boolean =>
      // Tracked here, inside `proceed`, so an add that's abandoned at the
      // sign-in prompt never counts. addItem always settles with the item in
      // the cart (it falls back to a local add if the API call fails).
      ensureIdentity(() => { void addItem(item).then(() => trackAddToCart(item, 1)); }),
    [addItem, ensureIdentity]
  );
}
