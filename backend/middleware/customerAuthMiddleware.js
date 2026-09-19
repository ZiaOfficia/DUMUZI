const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Protect customer routes via HttpOnly cookie JWT.
 * Attaches req.customer = { id, name, email, role } on success.
 * Completely separate from the admin Bearer-token middleware.
 */
const protectCustomer = async (req, res, next) => {
  const token = req.cookies?.customerToken;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, please log in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.type !== "customer") {
      return res.status(401).json({ message: "Invalid token type" });
    }

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.customer = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

/**
 * Same identification as protectCustomer, but never rejects the request.
 * Sets req.customer to the signed-in shopper, or null for a guest, so a route
 * can serve both (guest checkout) instead of forcing an account.
 */
const optionalCustomer = async (req, res, next) => {
  req.customer = null;

  const token = req.cookies?.customerToken;
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== "customer") return next();

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
    if (user) req.customer = user;
  } catch (error) {
    // An expired or bad cookie just means "treat this as a guest"
  }

  next();
};

module.exports = { protectCustomer, optionalCustomer };
