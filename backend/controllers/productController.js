const { Op } = require("sequelize");
const Product = require("../models/Product");

// ── @desc  Get all products (with optional filter/search)
// ── @route GET /api/products?category=HEART&search=cavity
// ── @access Public
const getProducts = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (category && category !== "ALL") {
      where.category = category.toUpperCase();
    }
    if (search) {
      where[Op.or] = [
        { description: { [Op.like]: `%${search}%` } },
        { productName: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      order: [["id", "ASC"]],
      limit: parseInt(limit),
      offset,
    });

    res.json({
      products,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / parseInt(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── @desc  Get single product by ID
// ── @route GET /api/products/:id
// ── @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getProductById };
