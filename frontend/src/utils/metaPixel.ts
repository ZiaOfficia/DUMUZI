/**
 * Meta Pixel ecommerce events.
 *
 * The base Pixel is loaded, initialised and fires the first PageView from
 * index.html — nothing here does any of that. These helpers only send events
 * through the `fbq` it defines, and do nothing when it's missing (blocked by an
 * ad blocker, or the script failed to load), so tracking can never break the
 * shop.
 *
 * content_ids are the numeric product ids (1–28): the same ids the frontend
 * catalogue and the backend Products table share. Keep them that way in every
 * event, and map any future Meta catalogue to them.
 */

type FbqParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (command: 'track', event: string, params?: FbqParams, options?: { eventID?: string }) => void;
  }
}

type StandardEvent = 'PageView' | 'ViewContent' | 'AddToCart' | 'InitiateCheckout' | 'Purchase';

const CURRENCY = 'INR';

/** Send one standard event. Returns true only if fbq accepted it. */
export function track(event: StandardEvent, params?: FbqParams, options?: { eventID?: string }): boolean {
  try {
    if (typeof window === 'undefined' || typeof window.fbq !== 'function') return false;
    if (options?.eventID) window.fbq('track', event, params, options);
    else if (params)      window.fbq('track', event, params);
    else                  window.fbq('track', event);
    return true;
  } catch {
    return false;
  }
}

/** Money for Meta: a finite number rounded to paise. */
const money = (n: number) => Math.round(n * 100) / 100;

// ── Line items ───────────────────────────────────────────────────────────────

/** A cart/order line as the checkout flows hold it (CartContext's CartItem). */
export interface TrackedLine {
  id: number;        // numeric product id
  price: number;     // rupees, per unit
  quantity: number;
}

export interface MetaContent {
  id: number;
  quantity: number;
  item_price: number;
}

/**
 * Real, paid-for products only. Free gifts (₹0) and the online-discount line
 * (productId 0) are not products the shopper bought, so they never count.
 */
const toContents = (lines: TrackedLine[]): MetaContent[] =>
  lines
    .filter(l => Number.isInteger(l.id) && l.id > 0 && l.price > 0 && l.quantity > 0)
    .map(l => ({ id: l.id, quantity: l.quantity, item_price: money(l.price) }));

// ── ViewContent / AddToCart ──────────────────────────────────────────────────

export function trackViewContent(product: { id: number; mrp: number }) {
  if (!Number.isInteger(product.id) || product.id <= 0 || !(product.mrp > 0)) return;
  track('ViewContent', {
    content_ids:  [product.id],
    content_type: 'product',
    value:        money(product.mrp),
    currency:     CURRENCY,
  });
}

export function trackAddToCart(item: { id: number; price: number }, quantity = 1) {
  if (!Number.isInteger(item.id) || item.id <= 0 || !(item.price > 0) || !(quantity > 0)) return;
  track('AddToCart', {
    content_ids:  [item.id],
    contents:     [{ id: item.id, quantity, item_price: money(item.price) }],
    content_type: 'product',
    value:        money(item.price * quantity),
    currency:     CURRENCY,
  });
}

// ── InitiateCheckout ─────────────────────────────────────────────────────────

/**
 * The cart last sent as InitiateCheckout in this page session. The site has two
 * checkout flows (the /checkout page and the cart drawer), and a shopper can
 * step in and out of either; the same cart only counts once. Any change to the
 * cart makes it a new checkout.
 */
let lastCheckoutKey: string | null = null;

const cartKey = (contents: MetaContent[]) =>
  contents.map(c => `${c.id}x${c.quantity}`).sort().join(',');

export function trackInitiateCheckout(lines: TrackedLine[], value: number) {
  const contents = toContents(lines);
  if (contents.length === 0 || !(value > 0)) return;

  const key = cartKey(contents);
  if (key === lastCheckoutKey) return;

  if (track('InitiateCheckout', {
    content_ids:  contents.map(c => c.id),
    contents,
    content_type: 'product',
    num_items:    contents.reduce((s, c) => s + c.quantity, 0),
    value:        money(value),
    currency:     CURRENCY,
  })) {
    lastCheckoutKey = key;
  }
}

// ── Purchase ─────────────────────────────────────────────────────────────────

/**
 * Everything needed to report one order as a Purchase. `paymentMethod` is kept
 * for our own bookkeeping — COD means "order placed", ONLINE means "order paid"
 * — and is not sent to Meta.
 */
export interface PurchaseContext {
  orderId: string;
  value: number;               // rupees, the server's order amount
  currency: 'INR';
  paymentMethod: 'COD' | 'ONLINE';
  content_ids: number[];
  contents: MetaContent[];
}

/** Build the context from a freshly created order and the lines it was created from. */
export function purchaseContextFor(
  order: { orderId: string; amount: number },   // amount in paise, as the API returns it
  lines: TrackedLine[],
  paymentMethod: 'COD' | 'ONLINE',
): PurchaseContext {
  const contents = toContents(lines);
  return {
    orderId:     order.orderId,
    value:       money(order.amount / 100),
    currency:    CURRENCY,
    paymentMethod,
    content_ids: contents.map(c => c.id),
    contents,
  };
}

const SENT_PREFIX = 'dumuzi_meta_purchase_sent_';

// Also remembered in memory, so a browser that refuses storage still can't
// double-send within one page session (e.g. StrictMode re-running an effect).
const sentThisSession = new Set<string>();

export const isPurchaseTracked = (orderId: string): boolean => {
  if (sentThisSession.has(orderId)) return true;
  try { return localStorage.getItem(SENT_PREFIX + orderId) !== null; } catch { return false; }
};

const markPurchaseTracked = (orderId: string) => {
  sentThisSession.add(orderId);
  try { localStorage.setItem(SENT_PREFIX + orderId, String(Date.now())); } catch { /* storage unavailable */ }
};

/**
 * The one place a Purchase is sent from — COD straight after the order is
 * created, online orders once the server confirms payment. Fires at most once
 * per order id; the event id is deterministic so a future Conversions API
 * sender can deduplicate against it.
 */
export function trackPurchase(ctx: PurchaseContext): boolean {
  if (!ctx.orderId || !(ctx.value > 0) || ctx.contents.length === 0) return false;
  if (isPurchaseTracked(ctx.orderId)) return false;

  const sent = track(
    'Purchase',
    {
      content_ids:  ctx.content_ids,
      contents:     ctx.contents,
      content_type: 'product',
      num_items:    ctx.contents.reduce((s, c) => s + c.quantity, 0),
      value:        ctx.value,
      currency:     ctx.currency,
    },
    { eventID: `purchase_${ctx.orderId}` },
  );

  if (sent) {
    markPurchaseTracked(ctx.orderId);
    lastCheckoutKey = null;          // the next cart is a new checkout
    if (readPendingPurchase(ctx.orderId)) clearPendingPurchase();
  }
  return sent;
}

// ── Pending online purchase (survives the round trip to PayU) ────────────────

/**
 * PayU takes the shopper off the site, and the cart can be emptied before they
 * land on /thank-you, so the order's contents are saved just before the
 * redirect. Only ever read back for the exact txnid PayU returns with, and
 * expires, so an old order's data can't leak into a new one.
 */
const PENDING_KEY = 'dumuzi_pending_meta_purchase_v1';
const PENDING_TTL_MS = 24 * 60 * 60 * 1000;

export const savePendingPurchase = (ctx: PurchaseContext) => {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify({ ctx, at: Date.now() }));
  } catch { /* storage unavailable — this order just goes untracked */ }
};

export const readPendingPurchase = (orderId: string): PurchaseContext | null => {
  try {
    const raw = JSON.parse(localStorage.getItem(PENDING_KEY) ?? 'null');
    if (!raw || typeof raw.at !== 'number' || !raw.ctx) return null;
    if (Date.now() - raw.at > PENDING_TTL_MS) return null;
    const ctx = raw.ctx as PurchaseContext;
    if (ctx.orderId !== orderId || !Array.isArray(ctx.contents)) return null;
    return ctx;
  } catch {
    return null;
  }
};

export const clearPendingPurchase = () => {
  try { localStorage.removeItem(PENDING_KEY); } catch { /* storage unavailable */ }
};
