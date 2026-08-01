const express = require('express');
const router  = express.Router();
const { protectCustomer } = require('../middleware/customerAuthMiddleware');
const { protect } = require('../middleware/authMiddleware'); // admin Bearer token
const {
  createOrder, payuCallback, getPaymentStatus, getMyOrders,
  adminGetOrders, adminGetOrderStats, adminUpdateOrderStatus,
} = require('../controllers/paymentController');

// Admin order management (Bearer token from /admin/login)
router.get('/admin/orders',            protect, adminGetOrders);
router.get('/admin/orders/stats',      protect, adminGetOrderStats);
router.put('/admin/orders/:id/status', protect, adminUpdateOrderStatus);

// PayU success/failure callback — PUBLIC on purpose.
// PayU posts here from its own servers; there is no session cookie on the
// request, so the payload is trusted only after its hash verifies.
router.post('/payu/callback', payuCallback);
router.get('/payu/callback',  payuCallback);   // some PayU flows come back as GET

// All order/payment routes require a logged-in customer
router.post('/create-order',  protectCustomer, createOrder);
router.get('/status/:txnid',  protectCustomer, getPaymentStatus);
router.get('/my-orders',      protectCustomer, getMyOrders);

module.exports = router;
