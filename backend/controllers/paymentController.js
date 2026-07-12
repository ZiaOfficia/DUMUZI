const Razorpay = require('razorpay');
const crypto  = require('crypto');
const Order   = require('../models/Order');
const Product = require('../models/Product');
const { priceOrderItems } = require('../utils/orderPricing');

let razorpay;
function getRazorpay() {
  if (!razorpay) {
    razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
}

exports.createOrder = async (req, res) => {
  try {
    const { items: rawItems, customer } = req.body;

    if (!rawItems || !rawItems.length) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Fall back to the logged-in account's details if not provided
    const name  = customer?.name  || req.customer.name;
    const email = customer?.email || req.customer.email;
    const phone = customer?.phone || req.customer.phone;
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Customer name, email and phone are required' });
    }

    // Price the cart from the Products table — client-sent prices are ignored
    const productIds = [...new Set(rawItems.map((i) => Number(i?.productId)))];
    const products = await Product.findAll({ where: { id: productIds } });
    const { items, totalRupees } = priceOrderItems(rawItems, products);

    // Compute total in paise (Razorpay requires smallest currency unit)
    const amountPaise = Math.round(totalRupees * 100);

    const rzpOrder = await getRazorpay().orders.create({
      amount:   amountPaise,
      currency: 'INR',
      receipt:  `rcpt_${Date.now()}`,
    });

    await Order.create({
      user_id:           req.customer.id, // set by protectCustomer middleware
      razorpay_order_id: rzpOrder.id,
      amount:            amountPaise,
      currency:          'INR',
      status:            'pending',
      customer_name:     name,
      customer_email:    email,
      customer_phone:    phone,
      items:             JSON.stringify(items),
    });

    res.json({
      orderId:  rzpOrder.id,
      amount:   amountPaise,
      currency: 'INR',
      key:      process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    if (err.status === 400) {
      return res.status(400).json({ message: err.message });
    }
    console.error('[payment] createOrder error:', err);
    res.status(500).json({ message: 'Failed to create order. Please try again.' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment details' });
    }

    // HMAC-SHA256 verification
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Only allow the owner of the order to verify it
    const where = { razorpay_order_id, user_id: req.customer.id };

    if (expected !== razorpay_signature) {
      await Order.update({ status: 'failed' }, { where });
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    await Order.update(
      { razorpay_payment_id, razorpay_signature, status: 'paid' },
      { where }
    );

    res.json({ success: true });
  } catch (err) {
    console.error('[payment] verifyPayment error:', err);
    res.status(500).json({ message: 'Payment verification failed' });
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
    id:        o.id,
    orderId:   o.razorpay_order_id,
    paymentId: o.razorpay_payment_id,
    amount:    o.amount, // paise
    currency:  o.currency,
    status:    o.status,
    customer: {
      name:  o.customer_name,
      email: o.customer_email,
      phone: o.customer_phone,
    },
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
      attributes: ['id', 'razorpay_order_id', 'amount', 'currency', 'status', 'items', 'createdAt'],
    });

    res.json(
      orders.map((o) => {
        let items = [];
        try { items = JSON.parse(o.items); } catch (_) {}
        return {
          id:        o.id,
          orderId:   o.razorpay_order_id,
          amount:    o.amount, // paise
          currency:  o.currency,
          status:    o.status,
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
