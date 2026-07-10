const express = require('express');
const router  = express.Router();
const { protectCustomer } = require('../middleware/customerAuthMiddleware');
const { createOrder, verifyPayment, getMyOrders } = require('../controllers/paymentController');

// All order/payment routes require a logged-in customer
router.post('/create-order', protectCustomer, createOrder);
router.post('/verify',       protectCustomer, verifyPayment);
router.get('/my-orders',     protectCustomer, getMyOrders);

module.exports = router;
