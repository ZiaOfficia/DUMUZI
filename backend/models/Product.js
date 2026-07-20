const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    brandName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "DUMUZI",
    },
    productName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    mrp: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("HEART", "DIAMOND", "BONBON", "OVAL"),
      allowNull: false,
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    tableName: "Products",
  }
);

module.exports = Product;
