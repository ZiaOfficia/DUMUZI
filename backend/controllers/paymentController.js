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
