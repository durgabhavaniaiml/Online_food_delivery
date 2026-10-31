import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize DB connection
connectDB();

app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// Ensure DB is connected for requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Auth Routes (support both with /api and without /api)
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

// Food Routes
app.use('/api/food', foodRoutes);
app.use('/food', foodRoutes);

// Order Routes
app.use('/api/order', orderRoutes);
app.use('/order', orderRoutes);

// Cart Routes
app.use('/api/cart', cartRoutes);
app.use('/cart', cartRoutes);

app.get('/', (req, res) => {
  res.send('FoodDash API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
