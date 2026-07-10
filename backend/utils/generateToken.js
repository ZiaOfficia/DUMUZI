const jwt = require("jsonwebtoken");

/**
 * Generate a JWT and set it as an HttpOnly cookie on the response.
 * Used for customer authentication (separate from admin Bearer tokens).
 */
const generateCustomerToken = (res, userId) => {
  const token = jwt.sign({ id: userId, type: "customer" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("customerToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // HTTPS in prod
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
  });

  return token;
};

/**
 * Clear the customer cookie on logout.
 */
const clearCustomerToken = (res) => {
  res.cookie("customerToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    expires: new Date(0),
  });
};

module.exports = { generateCustomerToken, clearCustomerToken };
