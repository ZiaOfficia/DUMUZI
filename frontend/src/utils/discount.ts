/**
 * Paying online earns a discount — it clears instantly and costs us no COD
 * handling, so it's the option we lead with at checkout.
 *
 * Mirrors ONLINE_DISCOUNT_RATE in backend/controllers/paymentController.js.
 * The backend recomputes the discount when it prices the order (client-sent
 * amounts are never trusted), so the two must round identically or the total
 * shown here won't match what PayU charges.
 */
export const ONLINE_DISCOUNT_RATE = 0.1;

export const ONLINE_DISCOUNT_PERCENT = Math.round(ONLINE_DISCOUNT_RATE * 100);

/** Rupees saved by paying online, rounded to whole paise like the server does. */
export const onlineDiscount = (subtotal: number) =>
  Math.round(subtotal * ONLINE_DISCOUNT_RATE * 100) / 100;

/** What the shopper actually pays with the method they've picked. */
export const payableTotal = (subtotal: number, paymentMethod: 'cod' | 'payu') =>
  paymentMethod === 'payu'
    ? Math.round((subtotal - onlineDiscount(subtotal)) * 100) / 100
    : subtotal;
