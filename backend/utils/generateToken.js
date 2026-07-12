const jwt = require("jsonwebtoken");

/**
 * Generate a JWT and set it as an HttpOnly cookie on the response.
 * Used for customer authentication (separate from admin Bearer tokens).
 */
// The frontend (dumuzi.com / localhost:5173) and backend (onrender.com) are
// different sites, so production cookies must be SameSite=None + Secure or the
// browser silently drops them. Local dev (http) uses Lax without Secure.
const cookieOptions = () => {
  const isProd = process.env.NODE_ENV !== "development";
  return {
    httpOnly: true,
    secure: isProd,                      // HTTPS only in prod
    sameSite: isProd ? "none" : "lax",   // cross-site allowed in prod
  };
};

const generateCustomerToken = (res, userId) => {
  const token = jwt.sign({ id: userId, type: "customer" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("customerToken", token, {
    ...cookieOptions(),
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
  });

  return token;
};

/**
 * Clear the customer cookie on logout.
 */
const clearCustomerToken = (res) => {
  res.cookie("customerToken", "", {
    ...cookieOptions(),
    expires: new Date(0),
  });
};

module.exports = { generateCustomerToken, clearCustomerToken };
