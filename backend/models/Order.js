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
    type: DataTypes.ENUM('pending', 'paid', 'failed'),
    defaultValue: 'pending',
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
  items: {
    type: DataTypes.TEXT, // JSON stringified cart items
    allowNull: false,
  },
}, { timestamps: true });

module.exports = Order;
