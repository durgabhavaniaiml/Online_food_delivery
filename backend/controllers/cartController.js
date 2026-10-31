import User from '../models/User.js';

// Add to cart
const addToCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = userData.cartData || {};
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: 'Added to cart' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = userData.cartData || {};
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }
    }
    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: 'Removed from cart' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, removeFromCart, getCart };
