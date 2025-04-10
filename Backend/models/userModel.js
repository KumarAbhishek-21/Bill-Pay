

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: { 
    type: String,
    required: true,
    trim: true, // Removes unnecessary spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true, 
  },
  phone: {
    type: String,
    required: true,
    unique: true, 
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER", 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

export const userModel = mongoose.model("User", UserSchema);
