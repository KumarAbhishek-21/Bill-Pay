import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: true,
  },
  billDate: {
    type: Date,
    required: true,
  },
  RoomRent: {
    type: Number,
    required: true,
  },
  unitsConsumed: {
    type: Number,
    required: true,
  },
  amountPerUnit: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true, // RoomRent + (unitsConsumed * amountPerUnit)
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "PAID"],
    default: "PENDING",
  },
  dues: {
    type: Number,
    default: 0, // Any outstanding balance
  },
});

export const 
billModel = mongoose.model("Bill", BillSchema);
// module.exports = Bill;
