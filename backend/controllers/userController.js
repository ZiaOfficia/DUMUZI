const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateCustomerToken, clearCustomerToken } = require("../utils/generateToken");

// ── helpers ──────────────────────────────────────────────────────────────────

const safeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  isVerified: user.isVerified,
  createdAt: user.createdAt,
});

// ── @desc  Register a new customer
// ── @route POST /api/users/register
// ── @access Public
const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }
    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Duplicate check
    const existing = await User.findOne({ where: { email: email.toLowerCase().trim() } });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || null,
      password: hashedPassword,
    });

    generateCustomerToken(res, user.id);

    res.status(201).json({
      message: "Account created successfully",
      user: safeUser(user),
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// ── @desc  Login customer
// ── @route POST /api/users/login
// ── @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { email: email.toLowerCase().trim() } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    generateCustomerToken(res, user.id);

    res.json({
      message: "Login successful",
      user: safeUser(user),
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error during login" });
  }
};

// ── @desc  Logout customer
// ── @route POST /api/users/logout
// ── @access Private
const logoutUser = (req, res) => {
  clearCustomerToken(res);
  res.json({ message: "Logged out successfully" });
};

// ── @desc  Get customer profile
// ── @route GET /api/users/profile
// ── @access Private
const getProfile = async (req, res) => {
  try {
    // req.customer is set by protectCustomer middleware
    const user = await User.findByPk(req.customer.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: safeUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── @desc  Update customer profile
// ── @route PUT /api/users/profile
// ── @access Private
const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!name || name.trim().length < 2) {
      return res.status(400).json({ message: "Name must be at least 2 characters" });
    }

    const user = await User.findByPk(req.customer.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.update({
      name: name.trim(),
      phone: phone?.trim() || user.phone,
    });

    res.json({
      message: "Profile updated successfully",
      user: safeUser(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── @desc  Change password
// ── @route PUT /api/users/change-password
// ── @access Private
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    const user = await User.findByPk(req.customer.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await user.update({ password: hashedPassword });

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── @desc  Check auth status (called on app load)
// ── @route GET /api/users/me
// ── @access Private
const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.customer.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user: safeUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser, getProfile, updateProfile, changePassword, getMe };
