import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'fooddash_super_secret_jwt_key_2024';

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body || {};
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is still connecting. Please check Atlas Network Access allows 0.0.0.0/0.',
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const exists = await User.findOne({ email: trimmedEmail });
    if (exists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }
    if (!validator.isEmail(trimmedEmail)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name: name.trim(), email: trimmedEmail, password: hashedPassword });
    await user.save();

    const token = createToken(user._id);
    return res.status(201).json({
      success: true,
      token,
      userId: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server registration error' });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body || {};
  try {
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Database is still connecting. Please check Atlas Network Access allows 0.0.0.0/0.',
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found. Please register first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = createToken(user._id);
    return res.json({
      success: true,
      token,
      userId: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server login error' });
  }
};

export { registerUser, loginUser };
