import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // FIX: Change type to 'Map' to correctly track changes in the cart object
    cartItems: { type: Map, of: Number, default: {} },
}, { minimize: false });

const User = mongoose.models.user || mongoose.model('User', userSchema);

export default User;