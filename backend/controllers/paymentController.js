const crypto   = require('crypto');
const Order    = require('../models/Order');
const Product  = require('../models/Product');
const CartItem = require('../models/CartItem');
const { priceOrderItems } = require('../utils/orderPricing');
const { resolveGifts } = require('../utils/offers');
const { sendPurchaseToMeta, captureClientContext } = require('../services/metaConversionsApi');
const {
  payuConfig, newTxnId, clean, formatAmount, requestHash, responseHash, hashMatches,
} = require('../utils/payu');

const PAYMENT_METHODS = ['payu', 'cod'];

/**
 * Paying online earns 10% off. Mirrored by ONLINE_DISCOUNT_RATE in
 * frontend/src/utils/discount.ts — keep the two in step, and keep the rounding
 * identical, or the total quoted in the cart won't match what PayU charges.
 */
const ONLINE_DISCOUNT_RATE  = 0.10;
const ONLINE_DISCOUNT_LABEL = 'Online payment discount (10%)';

/**
 * The gateway columns are named after the gateway we used first (Razorpay);
 * they hold PayU's equivalents now — txnid, mihpayid and the response hash.
 * Renaming them would ripple through the admin panel and order history for no
 * behavioural gain, so the mapping is documented here instead.
 */

/** Where PayU should POST the result. Absolute and public — PayU calls it, not the browser. */
const callbackBase = (req) =>
  (process.env.PUBLIC_API_URL || `${req.protocol}://${req.get('host')}`).replace(/\/+$/, '');

/** Where we send the shopper once we've recorded the result. */
const frontendBase = () =>
  (process.env.FRONTEND_URL || 'https://dumuzi.com').replace(/\/+$/, '');

exports.createOrder = async (req, res) => {
  try {
    const { items: rawItems, gifts: rawGifts, customer, address } = req.body;
    const paymentMethod = PAYMENT_METHODS.includes(req.body.paymentMethod)
      ? req.body.paymentMethod
      : 'payu';
    const shipping = {
      shipping_address: address?.address || null,
      shipping_city:    address?.city || null,
      shipping_state:   address?.state || null,
      shipping_pincode: address?.pincode || null,
      notes:            address?.notes || null,
    };
    // Kept on the order for the server-side Meta Purchase, which for PayU is
    // only sent later from the callback — a request that isn't the shopper's.
    const metaClientContext = JSON.stringify(captureClientContext(req));

    if (!rawItems || !rawItems.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Signed-in shopper, or null for a guest checkout (optionalCustomer).
    // Guests have no account to fall back on, so the body must carry their details.
    const userId = req.customer?.id ?? null;
    const name  = customer?.name  || req.customer?.name;
    const email = customer?.email || req.customer?.email;
    const phone = customer?.phone || req.customer?.phone;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Customer name, email and phone are required' });
    }

    // Price the cart from the Products table — client-sent prices are ignored.
    // Gift products are looked up too, so a claimed gift can be checked and
    // named from the catalogue rather than from the request.
    const productIds = [...new Set([
      ...rawItems.map((i) => Number(i?.productId)),
      ...(Array.isArray(rawGifts) ? rawGifts.map((g) => Number(g?.productId)) : []),
    ])].filter((id) => Number.isInteger(id) && id > 0);
    const products = await Product.findAll({ where: { id: productIds } });
    const { items, totalRupees } = priceOrderItems(rawItems, products);

    // Free gifts are re-earned from this order alone (see utils/offers.js) and
    // added at ₹0. They deliberately sit outside totalRupees: a gift is not
    // something the shopper paid for, so it must neither be charged for nor
    // inflate the discount below.
    const giftItems = resolveGifts(rawGifts, items, totalRupees, products);

    // The online-payment discount is worked out here rather than taken from the
    // client, so the amount charged is always the one actually earned — a
    // straight percentage of what this order's own paid items cost, nothing
    // else. It's recorded as a negative line item too, so an order's lines
    // still add up to its total in the customer's history and the admin panel.
    const discountRupees = paymentMethod === 'payu'
      ? Math.round(totalRupees * ONLINE_DISCOUNT_RATE * 100) / 100
      : 0;
    const payableRupees = Math.round((totalRupees - discountRupees) * 100) / 100;

    const orderItems = [
      ...items,
      ...giftItems,
      ...(discountRupees > 0
        ? [{ productId: 0, name: ONLINE_DISCOUNT_LABEL, price: -discountRupees, quantity: 1 }]
        : []),
    ];

    // Orders are stored in paise so integer maths stays exact; PayU itself is
    // handed rupees as a 2-decimal string further down.
    const amountPaise = Math.round(payableRupees * 100);

    if (paymentMethod === 'cod') {
      // No payment gateway involved — generate a synthetic order id so the
      // (required, unique) razorpay_order_id column still has something to key on.
      const codOrderId = `cod_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

      const codOrder = await Order.create({
        user_id:           userId, // null on a guest order
        razorpay_order_id: codOrderId,
        amount:            amountPaise,
        currency:          'INR',
        status:            'pending',
        payment_method:    'cod',
        customer_name:     name,
        customer_email:    email,
        customer_phone:    phone,
        items:             JSON.stringify(orderItems),
        meta_client_context: metaClientContext,
        ...shipping,
      });

      res.json({
        orderId:       codOrderId,
        amount:        amountPaise,
        currency:      'INR',
        paymentMethod: 'cod',
      });

      // A COD order placed is the conversion. Sent after the response, and
      // never awaited: Meta being slow or down must not touch checkout.
      sendPurchaseToMeta(codOrder).catch(() => {});
      return;
    }

    // ── PayU ────────────────────────────────────────────────────────────────
    // Throws 503 when the merchant key/salt aren't set, before we write a row.
    const { key, salt, action } = payuConfig();

    const txnid = newTxnId();
    const base  = callbackBase(req);

    // Signed fields. Everything in here is covered by the hash, so the values
    // stored on the order must be identical to the ones sent to PayU.
    const fields = {
      key,
      txnid,
      amount:      formatAmount(payableRupees),
      productinfo: clean(`DUMUZI order ${txnid}`),
      firstname:   clean(name.split(' ')[0] || name, 60),
      email:       clean(email, 80),
      phone:       clean(phone, 20),
      surl:        `${base}/api/payments/payu/callback`,
      furl:        `${base}/api/payments/payu/callback`,
    };
    fields.hash = requestHash(fields, salt);

    await Order.create({
      user_id:           userId, // null on a guest order
      razorpay_order_id: txnid,  // ← PayU txnid
      amount:            amountPaise,
      currency:          'INR',
      status:            'pending',
      payment_method:    'payu',
      customer_name:     name,
      customer_email:    email,
      customer_phone:    phone,
      items:             JSON.stringify(orderItems),
      meta_client_context: metaClientContext,
      ...shipping,
    });

    res.json({
      orderId:       txnid,
      amount:        amountPaise,
      currency:      'INR',
      paymentMethod: 'payu',
      // The browser auto-submits these as a form — no PayU script to load.
      payu: { action, params: fields },
    });
  } catch (err) {
    if (err.status === 400 || err.status === 503) {
      return res.status(err.status).json({ message: err.message });
    }
    console.error('[payment] createOrder error:', err);
    res.status(500).json({ message: 'Failed to create order. Please try again.' });
  }
};

// ═══════════════════════════════════════════════════════════════════
//  PayU callback — PayU POSTs here from its own servers/redirect.
//  Public by design: there is no customer session on this request, so the
//  order is identified by txnid and trusted only after the hash checks out.
// ═══════════════════════════════════════════════════════════════════

const doneUrl = (status, txnid) =>
  `${frontendBase()}/thank-you?type=order&status=${status}${txnid ? `&txnid=${encodeURIComponent(txnid)}` : ''}`;

exports.payuCallback = async (req, res) => {
  const body = { ...req.query, ...req.body };
  const { txnid } = body;

  try {
    const { salt } = payuConfig();

    if (!txnid || !body.hash) {
      console.warn('[payu] callback missing txnid/hash');
      return res.redirect(302, doneUrl('failed', txnid));
    }

    if (!hashMatches(responseHash(body, salt), body.hash)) {
      // Either tampering or a salt mismatch — never trust the payload.
      console.error(`[payu] hash mismatch for txnid=${txnid}`);
      await Order.update({ status: 'failed' }, { where: { razorpay_order_id: txnid } });
      return res.redirect(302, doneUrl('failed', txnid));
    }

    const order = await Order.findOne({ where: { razorpay_order_id: txnid } });
    if (!order) {
      console.error(`[payu] no order for txnid=${txnid}`);
      return res.redirect(302, doneUrl('failed', txnid));
    }

    // Guard against a replayed callback quoting a smaller amount than we charged.
    const paidPaise = Math.round(Number(body.amount) * 100);
    const success   = String(body.status).toLowerCase() === 'success' && paidPaise === order.amount;

    if (!success && String(body.status).toLowerCase() === 'success') {
      console.error(`[payu] amount mismatch for txnid=${txnid}: paid ${paidPaise}, expected ${order.amount}`);
    }

    order.status              = success ? 'paid' : 'failed';
    order.razorpay_payment_id = body.mihpayid || null;   // ← PayU payment id
    order.razorpay_signature  = body.hash;               // ← verified response hash
    await order.save();

    // The shopper is on PayU's domain right now, so the cart can only be
    // emptied here, server-side. Best-effort: a stale cart must not block the
    // redirect back to the confirmation page.
    if (success && order.user_id) {
      await CartItem.destroy({ where: { userId: order.user_id } })
        .catch((err) => console.error('[payu] cart clear failed:', err.message));
    }

    // Server-side Meta Purchase, now that the payment is verified — this is
    // what still counts the sale if the shopper never returns to the site.
    // Not awaited, and idempotent per order, so a replayed callback can't
    // double it and Meta can't delay the redirect.
    if (success) sendPurchaseToMeta(order).catch(() => {});

    res.redirect(302, doneUrl(success ? 'success' : 'failed', txnid));
  } catch (err) {
    console.error('[payu] callback error:', err);
    res.redirect(302, doneUrl('failed', txnid));
  }
};

/**
 * GET /api/payments/status/:txnid — what the confirmation page asks after PayU
 * has bounced the shopper back. The callback above is the only thing that can
 * mark an order paid; this just reports what it decided, scoped to the owner.
 *
 * A signed-in shopper only ever sees their own orders; a guest is limited to
 * guest orders (user_id null), which are keyed by an unguessable txnid.
 */
exports.getPaymentStatus = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { razorpay_order_id: req.params.txnid, user_id: req.customer?.id ?? null },
      attributes: ['razorpay_order_id', 'status', 'amount', 'payment_method'],
    });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({
      orderId:       order.razorpay_order_id,
      status:        order.status,
      amount:        order.amount,
      paymentMethod: order.payment_method,
      paid:          ['paid', 'shipped', 'delivered'].includes(order.status),
    });
  } catch (err) {
    console.error('[payment] getPaymentStatus error:', err);
    res.status(500).json({ message: 'Failed to fetch payment status' });
  }
};

// ═══════════════════════════════════════════════════════════════════
//  ADMIN — order management (routes protected by admin `protect`)
// ═══════════════════════════════════════════════════════════════════

const ORDER_STATUSES = ['pending', 'paid', 'failed', 'shipped', 'delivered', 'cancelled'];

const serializeOrder = (o) => {
  let items = [];
  try { items = JSON.parse(o.items); } catch (_) {}
  return {
    id:            o.id,
    orderId:       o.razorpay_order_id,
    paymentId:     o.razorpay_payment_id,
    amount:        o.amount, // paise
    currency:      o.currency,
    status:        o.status,
    paymentMethod: o.payment_method,
    customer: {
      name:  o.customer_name,
      email: o.customer_email,
      phone: o.customer_phone,
    },
    shippingAddress: {
      address: o.shipping_address,
      city:    o.shipping_city,
      state:   o.shipping_state,
      pincode: o.shipping_pincode,
    },
    notes: o.notes,
    items,
    createdAt: o.createdAt,
    updatedAt: o.updatedAt,
  };
};

// GET /api/payments/admin/orders?status=paid&page=1&limit=20
exports.adminGetOrders = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const where = {};

    if (req.query.status && ORDER_STATUSES.includes(req.query.status)) {
      where.status = req.query.status;
    }

    const { rows, count } = await Order.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit,
      offset: (page - 1) * limit,
    });

    res.json({
      orders: rows.map(serializeOrder),
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit) || 1,
      },
    });
  } catch (err) {
    console.error('[payment] adminGetOrders error:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

// GET /api/payments/admin/orders/stats — counts per status + paid revenue
exports.adminGetOrderStats = async (req, res) => {
  try {
    const rows = await Order.findAll({
      attributes: [
        'status',
        [Order.sequelize.fn('COUNT', Order.sequelize.col('id')), 'count'],
        [Order.sequelize.fn('SUM', Order.sequelize.col('amount')), 'amountPaise'],
      ],
      group: ['status'],
      raw: true,
    });

    const byStatus = {};
    let total = 0;
    let revenuePaise = 0; // paid + shipped + delivered = collected money
    for (const r of rows) {
      const count = Number(r.count);
      byStatus[r.status] = count;
      total += count;
      if (['paid', 'shipped', 'delivered'].includes(r.status)) {
        revenuePaise += Number(r.amountPaise) || 0;
      }
    }

    res.json({ total, byStatus, revenuePaise });
  } catch (err) {
    console.error('[payment] adminGetOrderStats error:', err);
    res.status(500).json({ message: 'Failed to fetch order stats' });
  }
};

// PUT /api/payments/admin/orders/:id/status  { status }
exports.adminUpdateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Allowed: ${ORDER_STATUSES.join(', ')}` });
    }

    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order: serializeOrder(order) });
  } catch (err) {
    console.error('[payment] adminUpdateOrderStatus error:', err);
    res.status(500).json({ message: 'Failed to update order status' });
  }
};

// GET /api/payments/my-orders — order history for the logged-in customer
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.customer.id },
      order: [['createdAt', 'DESC']],
      attributes: [
        'id', 'razorpay_order_id', 'amount', 'currency', 'status', 'payment_method',
        'shipping_address', 'shipping_city', 'shipping_state', 'shipping_pincode', 'notes',
        'items', 'createdAt',
      ],
    });

    res.json(
      orders.map((o) => {
        let items = [];
        try { items = JSON.parse(o.items); } catch (_) {}
        return {
          id:            o.id,
          orderId:       o.razorpay_order_id,
          amount:        o.amount, // paise
          currency:      o.currency,
          status:        o.status,
          paymentMethod: o.payment_method,
          shippingAddress: {
            address: o.shipping_address,
            city:    o.shipping_city,
            state:   o.shipping_state,
            pincode: o.shipping_pincode,
          },
          notes: o.notes,
          items,
          createdAt: o.createdAt,
        };
      })
    );
  } catch (err) {
    console.error('[payment] getMyOrders error:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};
