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

/**
 * Cash on Delivery carries a handling charge: ₹60, or ₹90 once the items come
 * to more than ₹1,000. Mirrors codFee in backend/controllers/paymentController.js,
 * which is the one that actually sets the amount on the order.
 */
export const COD_FEE_THRESHOLD = 1000;
export const COD_FEE_LOW = 60;
export const COD_FEE_HIGH = 90;

export const codFee = (subtotal: number) =>
  subtotal > COD_FEE_THRESHOLD ? COD_FEE_HIGH : COD_FEE_LOW;

/** What the shopper actually pays with the method they've picked. */
export const payableTotal = (subtotal: number, paymentMethod: 'cod' | 'payu') =>
  paymentMethod === 'payu'
    ? Math.round((subtotal - onlineDiscount(subtotal)) * 100) / 100
    : Math.round((subtotal + codFee(subtotal)) * 100) / 100;

/** How much cheaper paying online is than COD — the discount plus the COD charge avoided. */
export const onlineSaving = (subtotal: number) =>
  Math.round((payableTotal(subtotal, 'cod') - payableTotal(subtotal, 'payu')) * 100) / 100;
