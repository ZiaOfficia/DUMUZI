/**
 * PayU handoff.
 *
 * PayU's hosted checkout is a plain form POST, not a JS modal — there's no
 * script to load and nothing to configure client-side. The backend signs the
 * fields (the salt never leaves the server); all we do is post them and let the
 * browser navigate to PayU. The result comes back to the backend's callback,
 * which redirects to /thank-you.
 */

export interface PayuHandoff {
  /** PayU's payment endpoint — test or production, decided by the backend */
  action: string;
  /** signed form fields, including the hash */
  params: Record<string, string>;
}

/**
 * The payment we last handed off to PayU, remembered across the round trip.
 *
 * A guest's cart lives only in this browser, and the callback that empties a
 * signed-in shopper's cart has no guest cart to empty. So if the shopper pays
 * and then closes PayU's tab instead of following the redirect to /thank-you,
 * the items they just bought are still in their cart — and they'd inflate the
 * subtotal, combo tier and discount of whatever they add next. Recording the
 * txnid lets the cart ask the server what became of that payment on the next
 * visit and tidy up. Expires so an abandoned payment isn't re-checked forever.
 */
const PENDING_PAYMENT_KEY = 'dumuzi_pending_payment';
const PENDING_PAYMENT_TTL_MS = 24 * 60 * 60 * 1000;

export const rememberPendingPayment = (txnid: string) => {
  try {
    localStorage.setItem(PENDING_PAYMENT_KEY, JSON.stringify({ txnid, at: Date.now() }));
  } catch { /* storage unavailable */ }
};

export const readPendingPayment = (): string | null => {
  try {
    const raw = JSON.parse(localStorage.getItem(PENDING_PAYMENT_KEY) ?? 'null');
    if (!raw || typeof raw.txnid !== 'string' || typeof raw.at !== 'number') return null;
    if (Date.now() - raw.at > PENDING_PAYMENT_TTL_MS) return null;
    return raw.txnid;
  } catch {
    return null;
  }
};

export const clearPendingPayment = () => {
  try { localStorage.removeItem(PENDING_PAYMENT_KEY); } catch { /* storage unavailable */ }
};

/**
 * Submit the signed fields to PayU. This navigates away from the SPA, so
 * nothing after the call will run — clear any local state first.
 */
export function redirectToPayu({ action, params }: PayuHandoff): void {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = action;
  form.style.display = 'none';
  // PayU signs bytes, so the form must post back in the same encoding.
  form.acceptCharset = 'UTF-8';

  for (const [name, value] of Object.entries(params)) {
    const input = document.createElement('input');
    input.type  = 'hidden';
    input.name  = name;
    input.value = value ?? '';
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
}
