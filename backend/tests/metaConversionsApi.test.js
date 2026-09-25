const test = require('node:test');
const assert = require('node:assert');
const crypto = require('node:crypto');
const path = require('node:path');

// ── In-memory stand-ins, installed before anything loads the real modules ────
// The real models build a Sequelize connection and axios talks to Meta; the
// tests swap both for fakes through the require cache, so the controller and
// service below are the real code paths.

const rows = new Map();          // id → row
let nextId = 1;
const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');

const matches = (row, where) =>
  Object.entries(where).every(([k, v]) => (v === null ? row[k] == null : row[k] === v));

function makeInstance(row) {
  return Object.assign(Object.create({
    async save() { rows.set(this.id, { ...rows.get(this.id), ...plain(this), updatedAt: new Date() }); return this; },
  }), row);
}
const plain = (inst) => Object.fromEntries(Object.entries(inst));

const FakeOrder = {
  async create(values) {
    const row = { meta_capi_status: null, meta_capi_attempts: 0, meta_capi_event_time: null,
      meta_capi_sent_at: null, ...values, id: nextId++, createdAt: new Date(), updatedAt: new Date() };
    rows.set(row.id, row);
    return makeInstance({ ...row });
  },
  async findByPk(id) { const r = rows.get(id); return r ? makeInstance({ ...r }) : null; },
  async findOne({ where }) {
    for (const r of rows.values()) if (matches(r, where)) return makeInstance({ ...r });
    return null;
  },
  async update(values, { where }) {
    let n = 0;
    for (const [id, r] of rows) {
      if (matches(r, where)) { rows.set(id, { ...r, ...values, updatedAt: new Date() }); n++; }
    }
    return [n];
  },
};

const PRODUCTS = [
  { id: 3, productName: 'LF-H3T', mrp: '110.00', inStock: true },
  { id: 5, productName: 'LF-H5',  mrp: '160.00', inStock: true },
  { id: 2, productName: 'LF-H3',  mrp: '99.00',  inStock: true },
];
const FakeProduct = { async findAll() { return PRODUCTS; } };
const FakeCartItem = { async destroy() { return 0; } };

const metaPosts = [];            // every request that would have gone to Meta
let metaBehaviour = 'ok';        // 'ok' | 'error500' | 'timeout'
const fakeAxios = {
  async post(url, body) {
    metaPosts.push({ url, body });
    if (metaBehaviour === 'error500') {
      throw Object.assign(new Error('Request failed with status code 500'), {
        response: { status: 500, data: { error: { message: 'Service temporarily unavailable', code: 2, fbtrace_id: 'TRACE' } } },
      });
    }
    if (metaBehaviour === 'timeout') throw Object.assign(new Error('timeout of 8000ms exceeded'), { code: 'ECONNABORTED' });
    return { status: 200, data: { events_received: 1, fbtrace_id: 'TRACE' } };
  },
};

const stub = (rel, exports) => {
  const file = require.resolve(path.join(__dirname, '..', rel));
  require.cache[file] = { id: file, filename: file, loaded: true, exports };
};
stub('models/Order', FakeOrder);
stub('models/Product', FakeProduct);
stub('models/CartItem', FakeCartItem);
require.cache[require.resolve('axios')] = { id: 'axios', filename: 'axios', loaded: true, exports: fakeAxios };

process.env.META_PIXEL_ID = '3602765189880157';
process.env.META_ACCESS_TOKEN = 'TEST_TOKEN_never_logged';
process.env.PAYU_MERCHANT_KEY = 'gtKFFx';
process.env.PAYU_MERCHANT_SALT = 'eCwWELxi';

const capi = require('../services/metaConversionsApi');
const payment = require('../controllers/paymentController');
const { responseHash } = require('../utils/payu');

// ── helpers ──────────────────────────────────────────────────────────────────

const settle = () => new Promise((r) => setTimeout(r, 30));   // let fire-and-forget sends finish

const fakeRes = () => {
  const res = { statusCode: 200, body: null, redirectedTo: null };
  res.status = (c) => { res.statusCode = c; return res; };
  res.json = (b) => { res.body = b; return res; };
  res.redirect = (_code, url) => { res.redirectedTo = url; return res; };
  return res;
};

const checkoutReq = ({ paymentMethod, customer = null, meta = {} } = {}) => ({
  body: {
    items: [{ productId: 3, quantity: 2 }, { productId: 5, quantity: 1 }],
    gifts: [],
    customer: { name: 'Asha  Rao Kumar', email: ' Asha.Rao@Example.COM ', phone: '+91 98765-43210' },
    paymentMethod,
    address: { address: '1 MG Road', city: 'New Delhi', state: 'Tamil Nadu', pincode: '400 001' },
    meta,
  },
  customer,
  ip: '::ffff:203.0.113.7',
  protocol: 'https',
  get: (h) => ({ 'user-agent': 'Mozilla/5.0 TestBrowser', host: 'api.test' })[h.toLowerCase()],
});

const payuCallback = async (txnid, { status = 'success', amount } = {}) => {
  const row = [...rows.values()].find((r) => r.razorpay_order_id === txnid);
  const body = {
    key: 'gtKFFx', txnid, amount: amount ?? (row.amount / 100).toFixed(2),
    productinfo: `DUMUZI order ${txnid}`, firstname: 'Asha', email: 'asha.rao@example.com',
    status, mihpayid: 'MIH123',
  };
  body.hash = responseHash(body, 'eCwWELxi');
  const res = fakeRes();
  await payment.payuCallback({ body, query: {} }, res);
  return res;
};

const quiet = (fn) => async (...a) => {
  const { log, warn, error } = console;
  console.log = console.warn = console.error = () => {};
  try { return await fn(...a); } finally { Object.assign(console, { log, warn, error }); }
};

const reset = () => { rows.clear(); metaPosts.length = 0; metaBehaviour = 'ok'; };

// ── 1, 12, 13, 14: COD ───────────────────────────────────────────────────────

test('COD: one Purchase after the order is created, with the server amount and event id', quiet(async () => {
  reset();
  const res = fakeRes();
  await payment.createOrder(checkoutReq({ paymentMethod: 'cod', meta: { fbp: 'fb.1.1727000000000.123456789' } }), res);
  assert.strictEqual(res.statusCode, 200);
  await settle();

  assert.strictEqual(metaPosts.length, 1);
  const { url, body } = metaPosts[0];
  assert.strictEqual(url, 'https://graph.facebook.com/v26.0/3602765189880157/events');
  const ev = body.data[0];
  const orderId = res.body.orderId;
  assert.strictEqual(ev.event_name, 'Purchase');
  assert.strictEqual(ev.event_id, `purchase_${orderId}`);      // == the browser Pixel's eventID
  assert.strictEqual(ev.action_source, 'website');
  assert.strictEqual(ev.custom_data.currency, 'INR');
  assert.strictEqual(ev.custom_data.value, 380);                // COD: no discount, server-priced 2×110 + 160
  assert.deepStrictEqual(ev.custom_data.content_ids, ['3', '5']);
  assert.strictEqual(ev.user_data.fbp, 'fb.1.1727000000000.123456789');
  assert.strictEqual(rows.get(1).meta_capi_status, 'sent');
}));

test('COD retry of the same order sends nothing more', quiet(async () => {
  // continues from the order above
  const order = await FakeOrder.findByPk(1);
  assert.strictEqual(await capi.sendPurchaseToMeta(order), 'duplicate');
  assert.strictEqual(metaPosts.length, 1);
}));

// ── 2, 3, 4, 12: PayU ────────────────────────────────────────────────────────

test('PayU: nothing at order creation, one Purchase once the callback confirms payment', quiet(async () => {
  reset();
  const res = fakeRes();
  await payment.createOrder(checkoutReq({ paymentMethod: 'payu' }), res);
  await settle();
  assert.strictEqual(metaPosts.length, 0, 'no Purchase for an unpaid order');

  const cb = await payuCallback(res.body.orderId);
  assert.match(cb.redirectedTo, /status=success/);
  await settle();

  assert.strictEqual(metaPosts.length, 1);
  const ev = metaPosts[0].body.data[0];
  assert.strictEqual(ev.event_id, `purchase_${res.body.orderId}`);
  assert.strictEqual(ev.custom_data.value, 342);                // 380 − 10% online discount
}));

test('PayU: a replayed success callback does not send a second Purchase', quiet(async () => {
  const txnid = [...rows.values()][0].razorpay_order_id;
  await payuCallback(txnid);
  await payuCallback(txnid);
  await settle();
  assert.strictEqual(metaPosts.length, 1);
}));

test('PayU: concurrent callbacks still produce one Purchase', quiet(async () => {
  reset();
  const res = fakeRes();
  await payment.createOrder(checkoutReq({ paymentMethod: 'payu' }), res);
  await Promise.all([payuCallback(res.body.orderId), payuCallback(res.body.orderId), payuCallback(res.body.orderId)]);
  await settle();
  assert.strictEqual(metaPosts.length, 1);
}));

test('PayU: a failed payment sends no Purchase', quiet(async () => {
  reset();
  const res = fakeRes();
  await payment.createOrder(checkoutReq({ paymentMethod: 'payu' }), res);
  const cb = await payuCallback(res.body.orderId, { status: 'failure' });
  assert.match(cb.redirectedTo, /status=failed/);
  await settle();
  assert.strictEqual(metaPosts.length, 0);
}));

test('PayU: an underpaid "success" is treated as failed and sends nothing', quiet(async () => {
  reset();
  const res = fakeRes();
  await payment.createOrder(checkoutReq({ paymentMethod: 'payu' }), res);
  await payuCallback(res.body.orderId, { amount: '1.00' });
  await settle();
  assert.strictEqual(metaPosts.length, 0);
}));

// ── 5, 7: Meta failures ──────────────────────────────────────────────────────

test('Meta 500: the order still succeeds, and a later retry sends it', quiet(async () => {
  reset();
  metaBehaviour = 'error500';
  const res = fakeRes();
  await payment.createOrder(checkoutReq({ paymentMethod: 'cod' }), res);
  assert.strictEqual(res.statusCode, 200);
  assert.ok(res.body.orderId);
  await settle();
  const row = [...rows.values()][0];
  assert.strictEqual(row.meta_capi_status, 'failed');
  assert.strictEqual(row.meta_capi_attempts, 1);

  metaBehaviour = 'ok';
  assert.strictEqual(await capi.sendPurchaseToMeta(row), 'sent');
  assert.strictEqual(metaPosts.length, 2);
  // same logical event on the retry: same id and same event_time
  assert.strictEqual(metaPosts[1].body.data[0].event_id, metaPosts[0].body.data[0].event_id);
  assert.strictEqual(metaPosts[1].body.data[0].event_time, metaPosts[0].body.data[0].event_time);
  assert.strictEqual(await capi.sendPurchaseToMeta(row), 'duplicate');
}));

test('Meta keeps failing: retries stop at the attempt cap', quiet(async () => {
  reset();
  metaBehaviour = 'timeout';
  const order = await FakeOrder.create({ razorpay_order_id: 'cod_cap', payment_method: 'cod', status: 'pending',
    amount: 9900, currency: 'INR', customer_name: 'A', customer_email: 'a@b.co', customer_phone: '9876543210',
    items: JSON.stringify([{ productId: 2, name: 'LF-H3', price: 99, quantity: 1 }]) });
  for (let i = 0; i < capi.MAX_ATTEMPTS + 3; i++) await capi.sendPurchaseToMeta(order);
  assert.strictEqual(metaPosts.length, capi.MAX_ATTEMPTS);
  assert.strictEqual(rows.get(order.id).meta_capi_status, 'failed');
}));

test('failure logs never contain the access token or customer details', async () => {
  reset();
  metaBehaviour = 'error500';
  const lines = [];
  const { log, warn, error } = console;
  console.log = console.warn = console.error = (...a) => lines.push(a.join(' '));
  try {
    const res = fakeRes();
    await payment.createOrder(checkoutReq({ paymentMethod: 'cod' }), res);
    await settle();
  } finally { Object.assign(console, { log, warn, error }); }
  const all = lines.join('\n');
  assert.match(all, /\[meta-capi\] Purchase failed/);
  assert.ok(!all.includes('TEST_TOKEN_never_logged'));
  assert.ok(!/asha|98765|example\.com/i.test(all));
});

// ── 6: not configured ────────────────────────────────────────────────────────

test('no access token: the order succeeds and CAPI is skipped, unclaimed for later', quiet(async () => {
  reset();
  const saved = process.env.META_ACCESS_TOKEN;
  delete process.env.META_ACCESS_TOKEN;
  try {
    const res = fakeRes();
    await payment.createOrder(checkoutReq({ paymentMethod: 'cod' }), res);
    assert.strictEqual(res.statusCode, 200);
    await settle();
    assert.strictEqual(metaPosts.length, 0);
    assert.strictEqual([...rows.values()][0].meta_capi_status, null);
  } finally { process.env.META_ACCESS_TOKEN = saved; }
}));

// ── 8, 9: user_data ──────────────────────────────────────────────────────────

test('guest order: user_data holds only the checkout details, normalised and hashed', quiet(async () => {
  reset();
  const res = fakeRes();
  await payment.createOrder(checkoutReq({ paymentMethod: 'cod', meta: { fbp: 'bogus', fbc: 'fb.1.1727000000000.IwAR0abc' } }), res);
  await settle();
  const u = metaPosts[0].body.data[0].user_data;
  assert.strictEqual(u.em, sha256('asha.rao@example.com'));
  assert.strictEqual(u.ph, sha256('919876543210'));             // country code added, symbols gone
  assert.strictEqual(u.fn, sha256('asha'));
  assert.strictEqual(u.ln, sha256('kumar'));
  assert.strictEqual(u.ct, sha256('newdelhi'));
  assert.strictEqual(u.st, sha256('tamilnadu'));
  assert.strictEqual(u.zp, sha256('400001'));
  assert.strictEqual(u.external_id, undefined, 'a guest has no account id');
  assert.strictEqual(u.fbp, undefined, 'malformed _fbp dropped');
  assert.strictEqual(u.fbc, 'fb.1.1727000000000.IwAR0abc');      // unhashed, as Meta requires
  assert.strictEqual(u.client_ip_address, '203.0.113.7');        // from the request, not the body
  assert.strictEqual(u.client_user_agent, 'Mozilla/5.0 TestBrowser');
  assert.strictEqual(u.country, undefined, 'no country collected, none invented');
}));

test('signed-in order: external_id is the hashed account id', quiet(async () => {
  reset();
  const res = fakeRes();
  await payment.createOrder(checkoutReq({ paymentMethod: 'cod', customer: { id: 42, name: 'x', email: 'x@y.co', phone: '1' } }), res);
  await settle();
  assert.strictEqual(metaPosts[0].body.data[0].user_data.external_id, sha256('42'));
}));

test('a client-supplied IP in the body is ignored', () => {
  const ctx = capi.captureClientContext({ ...checkoutReq(), body: { meta: { ip: '1.2.3.4' } } });
  assert.strictEqual(ctx.ip, '203.0.113.7');
});

// ── 10, 11: contents ─────────────────────────────────────────────────────────

test('gifts and the discount line are left out of contents', () => {
  const contents = capi.purchaseContents([
    { productId: 3, name: 'LF-H3T', price: 110, quantity: 2 },
    { productId: 2, name: 'LF-H3 (free gift)', price: 0, quantity: 1 },
    { productId: 0, name: 'Online payment discount (10%)', price: -38, quantity: 1 },
  ]);
  assert.deepStrictEqual(contents, [{ id: '3', quantity: 2, item_price: 110 }]);
});

test('an order with a claimed gift: gift excluded, value is what was charged', quiet(async () => {
  reset();
  const req = checkoutReq({ paymentMethod: 'payu' });
  req.body.items = [{ productId: 5, quantity: 4 }];      // ₹640 subtotal clears the combo gift tier
  req.body.gifts = [{ productId: 2, source: 'combo' }];
  const res = fakeRes();
  await payment.createOrder(req, res);
  const stored = JSON.parse([...rows.values()][0].items);
  await payuCallback(res.body.orderId);
  await settle();
  const cd = metaPosts[0].body.data[0].custom_data;
  assert.deepStrictEqual(cd.content_ids, ['5']);
  assert.strictEqual(cd.value, res.body.amount / 100);
  assert.ok(stored.some((i) => i.productId === 2 && i.price === 0), 'the stored order does carry the ₹0 gift line');
  assert.ok(stored.some((i) => i.productId === 0), 'the stored order does carry a discount line');
}));

// ── eligibility, test mode, expiry ───────────────────────────────────────────

test('eligibility: COD unless failed/cancelled; online only once paid', () => {
  assert.strictEqual(capi.isPurchaseEligible({ payment_method: 'cod', status: 'pending' }), true);
  assert.strictEqual(capi.isPurchaseEligible({ payment_method: 'cod', status: 'cancelled' }), false);
  assert.strictEqual(capi.isPurchaseEligible({ payment_method: 'payu', status: 'pending' }), false);
  assert.strictEqual(capi.isPurchaseEligible({ payment_method: 'payu', status: 'failed' }), false);
  assert.strictEqual(capi.isPurchaseEligible({ payment_method: 'payu', status: 'paid' }), true);
});

test('META_TEST_EVENT_CODE is passed through only when set', quiet(async () => {
  reset();
  process.env.META_TEST_EVENT_CODE = 'TEST12345';
  try {
    await payment.createOrder(checkoutReq({ paymentMethod: 'cod' }), fakeRes());
    await settle();
    assert.strictEqual(metaPosts[0].body.test_event_code, 'TEST12345');
  } finally { delete process.env.META_TEST_EVENT_CODE; }
  await payment.createOrder(checkoutReq({ paymentMethod: 'cod' }), fakeRes());
  await settle();
  assert.strictEqual('test_event_code' in metaPosts[1].body, false);
}));

test('an event older than 7 days is not sent', quiet(async () => {
  reset();
  const order = await FakeOrder.create({ razorpay_order_id: 'cod_old', payment_method: 'cod', status: 'pending',
    amount: 9900, customer_name: 'A', customer_email: 'a@b.co', customer_phone: '9876543210',
    meta_capi_status: 'failed', meta_capi_attempts: 1,
    meta_capi_event_time: Math.floor(Date.now() / 1000) - 8 * 24 * 3600,
    items: JSON.stringify([{ productId: 2, price: 99, quantity: 1 }]) });
  assert.strictEqual(await capi.sendPurchaseToMeta(order), 'expired');
  assert.strictEqual(metaPosts.length, 0);
}));
