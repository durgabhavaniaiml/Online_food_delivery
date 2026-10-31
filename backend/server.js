import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
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

// Ensure DB is connected for incoming requests
app.use(async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }
  } catch (err) {
    console.error('Middleware DB connect error:', err);
  }
  next();
});

// Comprehensive Health check endpoint
const handleHealth = (req, res) => {
  res.json({
    status: 'ok',
    dbState: mongoose.connection.readyState,
    dbConnected: mongoose.connection.readyState === 1,
    hasMongoUriEnv: !!process.env.MONGO_URI,
    hasJwtSecretEnv: !!process.env.JWT_SECRET,
    time: new Date().toISOString(),
  });
};
app.get('/api/health', handleHealth);
app.get('/health', handleHealth);

// Auth Routes (both with and without /api prefix)
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

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('SERVER_ERROR:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

export default app;
