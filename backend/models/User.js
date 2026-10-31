import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true, minimize: false });

const User = mongoose.model('User', userSchema);
export default User;
