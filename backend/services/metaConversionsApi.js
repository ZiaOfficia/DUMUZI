/**
 * Meta Conversions API — server-side Purchase.
 *
 * The storefront already sends Purchase from the browser Pixel with
 * eventID `purchase_<orderId>`. This sends the same event from the server with
 * the same event_id, so Meta keeps one and drops the other (it deduplicates
 * matching event_name + event_id within 48 hours). The server copy is what
 * still arrives when the shopper never comes back from PayU, blocks the Pixel,
 * or has storage switched off.
 *
 * When it fires:
 *   • COD  — once the order row is created (an order placed is the conversion)
 *   • PayU — once the callback has verified the payment and marked it paid
 *
 * It is analytics, never part of the transaction: nothing here throws, every
 * call is fire-and-forget from the caller's side, and a Meta outage, a bad
 * token or a timeout only ever produces a log line.
 *
 * Idempotency lives on the order row (meta_capi_* columns). A send is claimed
 * with a compare-and-set update, so a replayed PayU callback or a retried
 * request can't produce a second logical Purchase; a failed send stays
 * retryable, up to MAX_ATTEMPTS.
 */
const crypto = require('crypto');
const net    = require('net');
const axios  = require('axios');

const DEFAULT_API_VERSION = 'v26.0';   // latest Graph API as of 2026-07-29
const REQUEST_TIMEOUT_MS  = 8000;
const MAX_ATTEMPTS        = 5;
const STALE_SENDING_MS    = 5 * 60 * 1000;          // a 'sending' claim older than this was lost (e.g. a restart)
const MAX_EVENT_AGE_S     = 7 * 24 * 60 * 60;       // Meta rejects events older than 7 days

// Read on every call, not at load, so a changed Render env var needs no code change
// and tests can set it per case.
const metaConfig = () => ({
  pixelId:       (process.env.META_PIXEL_ID || '').trim(),
  accessToken:   (process.env.META_ACCESS_TOKEN || '').trim(),
  apiVersion:    (process.env.META_GRAPH_API_VERSION || DEFAULT_API_VERSION).trim(),
  testEventCode: (process.env.META_TEST_EVENT_CODE || '').trim(),
  frontendUrl:   (process.env.FRONTEND_URL || 'https://dumuzi.com').replace(/\/+$/, ''),
});

// ── Normalisation + hashing (Meta customer-information rules) ────────────────

const sha256 = (s) => crypto.createHash('sha256').update(s, 'utf8').digest('hex');

/** Lowercase, letters and digits only (names, city, state). */
const lettersDigits = (s) =>
  String(s ?? '').normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

const normEmail = (s) => {
  const e = String(s ?? '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : '';
};

/**
 * Digits only, with the country code Meta requires. Checkout is India-only
 * (INR, 6-digit PIN, +91 placeholder), so a bare 10-digit mobile gets 91; a
 * number that already carries a code is left as the shopper typed it.
 */
const normPhone = (s) => {
  let d = String(s ?? '').replace(/\D/g, '').replace(/^0+/, '');
  if (d.length === 10) d = `91${d}`;
  return d.length >= 11 && d.length <= 15 ? d : '';
};

const normZip = (s) => String(s ?? '').toLowerCase().replace(/[\s-]/g, '');

const splitName = (full) => {
  const parts = String(full ?? '').trim().split(/\s+/).filter(Boolean);
  return {
    fn: parts[0] || '',
    ln: parts.length > 1 ? parts[parts.length - 1] : '',
  };
};

const hashed = (v) => (v ? sha256(v) : undefined);

// ── Browser/request context captured when the order is created ──────────────

// fb.<subdomain index>.<creation ms>.<random | fbclid>
const FB_COOKIE_RE = /^fb\.\d\.\d{10,16}\.[A-Za-z0-9_.-]{1,400}$/;

/**
 * What the server legitimately knows about the shopper's browser at checkout:
 * the request's own IP and user agent, plus the _fbp/_fbc cookies the
 * storefront forwards (they're first-party cookies on the shop's domain, so
 * this API on another domain never receives them directly). Anything
 * malformed is dropped rather than sent.
 */
function captureClientContext(req) {
  const meta = req.body?.meta || {};
  const ip   = String(req.ip || '').replace(/^::ffff:/, '');
  const ua   = String(req.get?.('user-agent') || '').slice(0, 512);
  return {
    fbp: FB_COOKIE_RE.test(meta.fbp || '') ? meta.fbp : undefined,
    fbc: FB_COOKIE_RE.test(meta.fbc || '') ? meta.fbc : undefined,
    ip:  net.isIP(ip) ? ip : undefined,
    ua:  ua || undefined,
  };
}

const parseJson = (s) => {
  try { return JSON.parse(s); } catch { return null; }
};

// ── Event ────────────────────────────────────────────────────────────────────

const orderIdOf = (order) => order.razorpay_order_id;   // PayU txnid, or cod_… for COD
const eventIdFor = (orderId) => `purchase_${orderId}`;   // must match the browser Pixel's eventID

/**
 * Only real, paid-for products: free gifts are ₹0 and the online discount is
 * a negative productId-0 line, and neither is something the shopper bought.
 */
function purchaseContents(items) {
  return (Array.isArray(items) ? items : [])
    .filter((i) => Number.isInteger(Number(i?.productId)) && Number(i.productId) > 0
      && Number(i.price) > 0 && Number.isInteger(Number(i.quantity)) && Number(i.quantity) > 0)
    .map((i) => ({
      id:         String(Number(i.productId)),
      quantity:   Number(i.quantity),
      item_price: Math.round(Number(i.price) * 100) / 100,
    }));
}

/** A Purchase is due for COD at placement, for online orders only once paid. */
function isPurchaseEligible(order) {
  if (!order) return false;
  if (order.payment_method === 'cod') return !['failed', 'cancelled'].includes(order.status);
  return ['paid', 'shipped', 'delivered'].includes(order.status);
}

/** Build the Conversions API event for an order row. Pure — no I/O. */
function buildPurchaseEvent(order, { eventTime, frontendUrl }) {
  const orderId  = orderIdOf(order);
  const contents = purchaseContents(parseJson(order.items));
  const value    = Math.round(Number(order.amount)) / 100;   // stored in paise
  const ctx      = parseJson(order.meta_client_context) || {};
  const { fn, ln } = splitName(order.customer_name);

  const userData = {
    em:          hashed(normEmail(order.customer_email)),
    ph:          hashed(normPhone(order.customer_phone)),
    fn:          hashed(lettersDigits(fn)),
    ln:          hashed(lettersDigits(ln)),
    ct:          hashed(lettersDigits(order.shipping_city)),
    st:          hashed(lettersDigits(order.shipping_state)),
    zp:          hashed(normZip(order.shipping_pincode)),
    external_id: order.user_id ? sha256(String(order.user_id)) : undefined,
    fbp:               ctx.fbp,
    fbc:               ctx.fbc,
    client_ip_address: ctx.ip,
    client_user_agent: ctx.ua,
  };
  for (const k of Object.keys(userData)) if (userData[k] === undefined) delete userData[k];

  return {
    event_name:       'Purchase',
    event_time:       eventTime,
    event_id:         eventIdFor(orderId),
    action_source:    'website',
    // Checkout is where the shopper committed; both checkout flows live there
    event_source_url: `${frontendUrl}/checkout`,
    user_data:        userData,
    custom_data: {
      currency:     order.currency || 'INR',
      value,
      content_ids:  contents.map((c) => c.id),
      contents,
      content_type: 'product',
      num_items:    contents.reduce((s, c) => s + c.quantity, 0),
      order_id:     orderId,
    },
  };
}

// ── Sending ──────────────────────────────────────────────────────────────────

const defaultPost = (url, body) =>
  axios.post(url, body, { timeout: REQUEST_TIMEOUT_MS }).then((r) => ({ status: r.status, data: r.data }));

/** A Meta error reduced to what's safe to log — never the request (it holds the token). */
const describeError = (err) => {
  const e = err?.response?.data?.error;
  return {
    httpStatus: err?.response?.status ?? null,
    code:       e?.code ?? err?.code ?? null,
    message:    (e?.message || err?.message || 'unknown error').slice(0, 300),
    fbtraceId:  e?.fbtrace_id ?? null,
  };
};

const canClaim = (row, nowMs) => {
  const status   = row.meta_capi_status ?? null;
  const attempts = Number(row.meta_capi_attempts) || 0;
  if (status === null)      return true;
  if (status === 'failed')  return attempts < MAX_ATTEMPTS;
  if (status === 'sending') return attempts < MAX_ATTEMPTS
    && nowMs - new Date(row.updatedAt).getTime() > STALE_SENDING_MS;
  return false;                                  // 'sent' or 'expired'
};

/**
 * Send the Purchase for one order, at most once. Safe to call from any number
 * of triggers; never throws. Resolves to a short outcome for logs/tests:
 * 'sent' | 'failed' | 'duplicate' | 'ineligible' | 'not-configured' | 'expired' | 'error'.
 *
 * @param {object} order  an Order instance (only its id is trusted; the row is re-read)
 * @param {object} [deps] test seams: { OrderModel, post, now }
 */
async function sendPurchaseToMeta(order, deps = {}) {
  const OrderModel = deps.OrderModel || require('../models/Order');
  const post       = deps.post || defaultPost;
  const nowMs      = deps.now ? deps.now() : Date.now();
  const tag        = `order=${order?.razorpay_order_id ?? order?.id ?? '?'}`;

  try {
    const cfg = metaConfig();
    if (!cfg.pixelId || !cfg.accessToken) {
      // Left unclaimed: once the token is set, the retry script can still send it.
      console.warn(`[meta-capi] not configured (META_PIXEL_ID/META_ACCESS_TOKEN) — Purchase skipped, ${tag}`);
      return 'not-configured';
    }

    // Re-read so eligibility and the claim are judged on the committed row.
    const row = await OrderModel.findByPk(order.id);
    if (!row || !isPurchaseEligible(row)) return 'ineligible';
    if (!canClaim(row, nowMs)) return 'duplicate';

    const attempts  = Number(row.meta_capi_attempts) || 0;
    const eventTime = Number(row.meta_capi_event_time) || Math.floor(nowMs / 1000);
    const eventId   = eventIdFor(orderIdOf(row));
    const logTag    = `${tag} method=${row.payment_method} event_id=${eventId}`;

    if (Math.floor(nowMs / 1000) - eventTime > MAX_EVENT_AGE_S) {
      await OrderModel.update({ meta_capi_status: 'expired' }, { where: { id: row.id } });
      console.warn(`[meta-capi] Purchase too old for Meta (>7 days) — not sent, ${logTag}`);
      return 'expired';
    }

    // Compare-and-set: only one caller can move the row from what we just read.
    const [claimed] = await OrderModel.update(
      { meta_capi_status: 'sending', meta_capi_attempts: attempts + 1, meta_capi_event_time: eventTime },
      { where: { id: row.id, meta_capi_status: row.meta_capi_status ?? null, meta_capi_attempts: attempts } },
    );
    if (claimed !== 1) return 'duplicate';

    const body = {
      data: [buildPurchaseEvent(row, { eventTime, frontendUrl: cfg.frontendUrl })],
      access_token: cfg.accessToken,               // in the body, so it never lands in a URL log
      ...(cfg.testEventCode ? { test_event_code: cfg.testEventCode } : {}),
    };
    const url = `https://graph.facebook.com/${cfg.apiVersion}/${cfg.pixelId}/events`;

    try {
      const res = await post(url, body);
      if (!(Number(res?.data?.events_received) >= 1)) {
        throw Object.assign(new Error('Meta accepted the request but received no events'), { response: res });
      }
      await OrderModel.update(
        { meta_capi_status: 'sent', meta_capi_sent_at: new Date(nowMs) },
        { where: { id: row.id } },
      );
      console.log(`[meta-capi] Purchase sent ${logTag} http=${res.status} events_received=${res.data.events_received}`
        + `${cfg.testEventCode ? ' (test event)' : ''} fbtrace_id=${res.data.fbtrace_id ?? '-'}`);
      return 'sent';
    } catch (err) {
      await OrderModel.update({ meta_capi_status: 'failed' }, { where: { id: row.id } })
        .catch((e) => console.error(`[meta-capi] could not record failure ${logTag}:`, e.message));
      const d = describeError(err);
      console.error(`[meta-capi] Purchase failed ${logTag} attempt=${attempts + 1}/${MAX_ATTEMPTS}`
        + ` http=${d.httpStatus} code=${d.code} fbtrace_id=${d.fbtraceId}: ${d.message}`);
      return 'failed';
    }
  } catch (err) {
    console.error(`[meta-capi] unexpected error, ${tag}:`, err?.message);
    return 'error';
  }
}

module.exports = {
  sendPurchaseToMeta,
  buildPurchaseEvent,
  captureClientContext,
  purchaseContents,
  isPurchaseEligible,
  eventIdFor,
  MAX_ATTEMPTS,
  // exported for tests
  _normalise: { normEmail, normPhone, normZip, lettersDigits, splitName, sha256 },
};
