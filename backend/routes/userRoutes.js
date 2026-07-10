const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  changePassword,
  getMe,
} = require("../controllers/userController");
const { protectCustomer } = require("../middleware/customerAuthMiddleware");

router.post("/register",         registerUser);
router.post("/login",            loginUser);
router.post("/logout",           protectCustomer, logoutUser);
router.get("/me",                protectCustomer, getMe);       // lightweight auth-check
router.get("/profile",           protectCustomer, getProfile);
router.put("/profile",           protectCustomer, updateProfile);
router.put("/change-password",   protectCustomer, changePassword);

module.exports = router;
