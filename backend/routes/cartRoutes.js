const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");
const { protectCustomer } = require("../middleware/customerAuthMiddleware");

// All cart routes require customer auth
router.use(protectCustomer);

router.get("/",       getCart);
router.post("/",      addToCart);
router.put("/:id",    updateCartItem);
router.delete("/",    clearCart);       // clear entire cart  — must come BEFORE /:id
router.delete("/:id", removeCartItem);

module.exports = router;
