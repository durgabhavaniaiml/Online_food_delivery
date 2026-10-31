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

app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// Ensure DB is connected for all incoming requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection middleware error:', err.message);
    return res.status(503).json({
      success: false,
      message: 'Database connection failed. Please ensure MongoDB Atlas Network Access has 0.0.0.0/0 allowed.',
    });
  }
});

// Health check endpoint
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

// Only start the HTTP listener when NOT running in a Vercel serverless environment
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
