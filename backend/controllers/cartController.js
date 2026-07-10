const CartItem = require("../models/CartItem");
const Product = require("../models/Product");

// ── helper: fetch full cart for a user ──────────────────────────────────────
const getUserCart = async (userId) => {
  const items = await CartItem.findAll({
    where: { userId },
    include: [{ model: Product, as: "product" }],
    order: [["createdAt", "ASC"]],
  });

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce(
    (s, i) => s + parseFloat(i.product?.mrp || 0) * i.quantity,
    0
  );

  return { items, totalItems, totalPrice: parseFloat(totalPrice.toFixed(2)) };
};

// ── @desc  Get cart for logged-in customer
// ── @route GET /api/cart
// ── @access Private
const getCart = async (req, res) => {
  try {
    const cart = await getUserCart(req.customer.id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── @desc  Add item to cart (or increase qty if already present)
// ── @route POST /api/cart
// ── @access Private
const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.customer.id;

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    // Verify product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (!product.inStock) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    // Upsert: increase qty if already in cart
    const [item, created] = await CartItem.findOrCreate({
      where: { userId, productId },
      defaults: { quantity: parseInt(quantity) },
    });

    if (!created) {
      await item.update({ quantity: item.quantity + parseInt(quantity) });
    }

    const cart = await getUserCart(userId);
    res.status(created ? 201 : 200).json({ message: "Cart updated", ...cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── @desc  Update quantity of a cart item
// ── @route PUT /api/cart/:id
// ── @access Private
const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = req.customer.id;

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ message: "Valid quantity is required" });
    }

    const item = await CartItem.findOne({
      where: { id: req.params.id, userId }, // userId guard: no cross-user access
    });

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (parseInt(quantity) <= 0) {
      await item.destroy();
    } else {
      await item.update({ quantity: parseInt(quantity) });
    }

    const cart = await getUserCart(userId);
    res.json({ message: "Cart updated", ...cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── @desc  Remove single item from cart
// ── @route DELETE /api/cart/:id
// ── @access Private
const removeCartItem = async (req, res) => {
  try {
    const userId = req.customer.id;

    const item = await CartItem.findOne({
      where: { id: req.params.id, userId },
    });

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await item.destroy();

    const cart = await getUserCart(userId);
    res.json({ message: "Item removed", ...cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── @desc  Clear entire cart
// ── @route DELETE /api/cart
// ── @access Private
const clearCart = async (req, res) => {
  try {
    await CartItem.destroy({ where: { userId: req.customer.id } });
    res.json({ message: "Cart cleared", items: [], totalItems: 0, totalPrice: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
