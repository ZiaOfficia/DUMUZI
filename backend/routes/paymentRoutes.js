const express = require('express');
const router  = express.Router();
const { protectCustomer } = require('../middleware/customerAuthMiddleware');
const { protect } = require('../middleware/authMiddleware'); // admin Bearer token
const {
  createOrder, verifyPayment, getMyOrders,
  adminGetOrders, adminGetOrderStats, adminUpdateOrderStatus,
} = require('../controllers/paymentController');

// Admin order management (Bearer token from /admin/login)
router.get('/admin/orders',            protect, adminGetOrders);
router.get('/admin/orders/stats',      protect, adminGetOrderStats);
router.put('/admin/orders/:id/status', protect, adminUpdateOrderStatus);

// All order/payment routes require a logged-in customer
router.post('/create-order', protectCustomer, createOrder);
router.post('/verify',       protectCustomer, verifyPayment);
router.get('/my-orders',     protectCustomer, getMyOrders);

module.exports = router;
