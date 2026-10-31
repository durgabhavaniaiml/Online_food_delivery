import mongoose from 'mongoose';

const FALLBACK_URI = 'mongodb+srv://fooduser:food12345@kontentx.3aeag9o.mongodb.net/fooddash?retryWrites=true&w=majority';

let isConnecting = false;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  if (isConnecting) {
    return;
  }

  isConnecting = true;
  try {
    const uri = process.env.MONGO_URI || FALLBACK_URI;
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  } finally {
    isConnecting = false;
  }
};

export default connectDB;
