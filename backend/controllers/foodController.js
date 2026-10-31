import Food from '../models/Food.js';
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
  let image_filename = req.file ? req.file.filename : (req.body.image || 'default.jpg');
  const food = new Food({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });
  try {
    await food.save();
    res.json({ success: true, message: 'Food added successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// List all food items
const listFood = async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.json({ success: false, message: 'Food not found' });
    if (food.image && food.image !== 'default.jpg') {
      fs.unlink(`uploads/${food.image}`, (err) => {});
    }
    await Food.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Food removed successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addFood, listFood, removeFood };
