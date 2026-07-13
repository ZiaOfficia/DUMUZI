const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: true, // null for legacy/guest orders created before login was required
    references: { model: 'Users', key: 'id' },
  },
  razorpay_order_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  razorpay_payment_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  razorpay_signature: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: DataTypes.INTEGER, // stored in paise
    allowNull: false,
  },
  currency: {
    type: DataTypes.STRING(8),
    defaultValue: 'INR',
  },
  status: {
    // pending/paid/failed come from the payment flow;
    // shipped/delivered/cancelled are set by the admin orders panel
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  payment_method: {
    type: DataTypes.STRING(20), // 'razorpay' | 'cod'
    defaultValue: 'razorpay',
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_address: {
    type: DataTypes.STRING,
    allowNull: true, // not every checkout flow (e.g. cart-drawer quick checkout) collects an address
  },
  shipping_city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shipping_state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shipping_pincode: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  items: {
    type: DataTypes.TEXT, // JSON stringified cart items
    allowNull: false,
  },
}, { timestamps: true });

module.exports = Order;
