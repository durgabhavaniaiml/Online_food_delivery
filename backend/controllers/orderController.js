import Order from '../models/Order.js';
import User from '../models/User.js';

// Place Order
const placeOrder = async (req, res) => {
  const DELIVERY_FEE = 2;
  try {
    const newOrder = new Order({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await User.findByIdAndUpdate(req.body.userId, { cartData: {} });
    res.json({ success: true, message: 'Order placed successfully', orderId: newOrder._id });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Mark order as paid (simulate payment)
const verifyOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    await Order.findByIdAndUpdate(orderId, { payment: true, status: 'Food Processing' });
    res.json({ success: true, message: 'Payment verified' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get user orders
const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId }).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get all orders (admin)
const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ date: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update order status (admin)
const updateStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
