/**
 * PayU (India) hosted-checkout helpers.
 *
 * PayU is a redirect gateway, not a modal: we sign a set of form fields with
 * SHA-512, the browser POSTs them to PayU, the customer pays there, and PayU
 * POSTs the result back to our `surl`/`furl`. Every hash here is built
 * server-side — the salt must never reach the browser.
 *
 * Request hash:
 *   sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
 * Response ("reverse") hash — the same fields backwards, salt first:
 *   sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 * When PayU includes `additionalCharges` in the response it is prepended:
 *   sha512(additionalCharges|SALT|status|…)
 */
const crypto = require('crypto');

const ENDPOINTS = {
  test:       'https://test.payu.in/_payment',
  production: 'https://secure.payu.in/_payment',
};

const sha512 = (str) => crypto.createHash('sha512').update(str).digest('hex');

/**
 * Merchant credentials + the endpoint to post to. Throws a 503-flavoured error
 * rather than a 500 when the keys are missing, so checkout can tell the shopper
 * to use Cash on Delivery instead of showing a generic failure.
 */
function payuConfig() {
  const key  = process.env.PAYU_MERCHANT_KEY;
  const salt = process.env.PAYU_MERCHANT_SALT;

  if (!key || !salt) {
    const err = new Error('Online payment is not configured yet. Please choose Cash on Delivery.');
    err.status = 503;
    throw err;
  }

  // Anything other than an explicit "production" stays on PayU's test bench —
  // a typo in the env var must never send real customers to a live charge.
  const mode = process.env.PAYU_MODE === 'production' ? 'production' : 'test';

  return { key, salt, mode, action: ENDPOINTS[mode] };
}

/**
 * Transaction id. PayU wants it unique, alphanumeric and ≤ 25 characters —
 * time-ordered prefix keeps it sortable, the random tail keeps it unguessable.
 */
const newTxnId = () =>
  `DMZ${Date.now().toString(36)}${crypto.randomBytes(4).toString('hex')}`.toUpperCase();

/** PayU splits the hash on `|`, so the value itself must never contain one. */
const clean = (value, max = 100) =>
  String(value ?? '')
    .replace(/[|]/g, ' ')
    .replace(/[^\x20-\x7E]/g, '')   // PayU signs bytes, not unicode — keep it ASCII
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

/** Amount must be the exact same string in the form and in the hash. */
const formatAmount = (rupees) => Number(rupees).toFixed(2);

/**
 * Sign an outgoing payment request. `fields` are the plain form values; the
 * returned hash covers them in PayU's required order.
 */
function requestHash(fields, salt) {
  const udf = (n) => fields[`udf${n}`] || '';
  return sha512([
    fields.key,
    fields.txnid,
    fields.amount,
    fields.productinfo,
    fields.firstname,
    fields.email,
    udf(1), udf(2), udf(3), udf(4), udf(5),
    '', '', '', '', '',            // five reserved slots PayU leaves empty
    salt,
  ].join('|'));
}

/**
 * Recompute the hash PayU sent back. Values are taken verbatim from the POST
 * body — PayU signs what it sends (e.g. "749.00"), so re-formatting would break
 * the comparison.
 */
function responseHash(body, salt) {
  const udf = (n) => body[`udf${n}`] || '';
  const base = [
    salt,
    body.status || '',
    '', '', '', '', '',            // the same five reserved slots, mirrored
    udf(5), udf(4), udf(3), udf(2), udf(1),
    body.email || '',
    body.firstname || '',
    body.productinfo || '',
    body.amount || '',
    body.txnid || '',
    body.key || '',
  ].join('|');

  return sha512(body.additionalCharges ? `${body.additionalCharges}|${base}` : base);
}

/** Constant-time compare so a bad hash can't be probed byte by byte. */
function hashMatches(expected, received) {
  if (typeof received !== 'string' || received.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received.toLowerCase()));
}

module.exports = {
  ENDPOINTS,
  payuConfig,
  newTxnId,
  clean,
  formatAmount,
  requestHash,
  responseHash,
  hashMatches,
};
