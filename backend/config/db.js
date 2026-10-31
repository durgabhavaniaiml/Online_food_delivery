import mongoose from 'mongoose';

const FALLBACK_URI = 'mongodb+srv://fooduser:food12345@kontentx.3aeag9o.mongodb.net/fooddash?retryWrites=true&w=majority';

let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cachedPromise) {
    const uri = process.env.MONGO_URI || FALLBACK_URI;
    cachedPromise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 6000,
      })
      .catch((err) => {
        cachedPromise = null;
        console.error('MongoDB connect error:', err.message);
        throw err;
      });
  }

  await cachedPromise;
  return mongoose.connection;
};

export default connectDB;
