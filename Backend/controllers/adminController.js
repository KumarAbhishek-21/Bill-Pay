import { userModel } from "../models/userModel.js";
import { billModel } from "../models/billModel.js";
import mongoose from "mongoose";
import { transporter } from "./notificationController.js";

// Fetch all users
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, "userName email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const getUserBills = async (req, res) => {
  try {
    const { userId } = req.params;

    // Check if the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Fetch bills for the user
    const bills = await billModel.find({ userId }); // Changed `{ user: userId }` to `{ userId }`

    res.json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: "Error fetching bills" });
  }
};

// Add bill controller

export const addBill = async (req, res) => {
  const { billDate, RoomRent, unitsConsumed, amountPerUnit, dueDate } =
    req.body;

  // Validate request body
  if (!billDate || !RoomRent || !unitsConsumed || !amountPerUnit || !dueDate) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const userId = req.params.userId;

  if (!mongoose.isValidObjectId(req.params.userId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid User ID format" });
  }

  try {
    // Find the user by ID from request params

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const clacTotal = (RoomRent, unitsConsumed, amountPerUnit) => {
      const e_amount = parseFloat(unitsConsumed) * parseFloat(amountPerUnit);
      return Math.round(RoomRent + Math.round(e_amount)); // Rounds the total amount
    };

    const totalAmountValue = clacTotal(RoomRent, unitsConsumed, amountPerUnit);

    // Create a new bill

    const bill = new billModel({
      userId: user._id, // Ensure this matches the schema
      billDate,
      RoomRent,
      unitsConsumed,
      amountPerUnit,
      totalAmount: totalAmountValue,
      dueDate,
      status: "PENDING",
    });

    // Save to database
    await bill.save();

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: user.email,
      subject: "New Electricity Bill Generated",
      html: `
      <h3>Hello ${user.userName},</h3>
      <p>Your new electricity bill has been generated:</p>
      <ul>
        <li><strong>Bill Date:</strong> ${billDate}</li>
        <li><strong>Room Rent:</strong> ₹${RoomRent}</li>
        <li><strong>Units Consumed:</strong> ${unitsConsumed} units</li>
        <li><strong>Amount Per Unit:</strong> ₹${amountPerUnit}</li>
        <li><strong>Total:</strong> ₹${totalAmountValue}</li>
        <li><strong>Due Date:</strong> ${dueDate}</li>
      </ul>
      <p>Please pay it before the due date.</p>
      <p>Thank you!</p>
      `,
    });

    res
      .status(201)
      .json({ success: true, message: "Bill added successfully", bill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update bill status controller

export const updateBillStatus = async (req, res) => {
  try {
    const bill = await billModel.findByIdAndUpdate(
      req.params.billId,
      { status: req.body.status },
      { new: true }
    );
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: "Error updating bill status" });
  }
};

// DELETE BILL CONTROLLER

export const deleteBill = async (req, res) => {
  try {
    const bill = await billModel.findByIdAndDelete(req.params.billId);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    } else {
      res.json({ message: "Bill deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting bill" });
  }
};

// UPDATE BILL CONTROLLER

export const updateBill = async (req, res) => {
  try {
    const bill = await billModel.findById(req.params.billId);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    const {
      billDate,
      RoomRent,
      unitsConsumed,
      amountPerUnit,
      dueDate,
      status,
    } = req.body;

    if (RoomRent !== undefined) bill.RoomRent = RoomRent;
    if (unitsConsumed !== undefined) bill.unitsConsumed = unitsConsumed;
    if (amountPerUnit !== undefined) bill.amountPerUnit = amountPerUnit;
    if (billDate !== undefined) bill.billDate = billDate;
    if (dueDate !== undefined) bill.dueDate = dueDate;
    if (status !== undefined) bill.status = status;

    bill.totalAmount = bill.RoomRent + bill.unitsConsumed * bill.amountPerUnit; // Recalculate total amount
    await bill.save();

    res.json({ message: "Bill updated successfully", bill });
  } catch (error) {
    res.status(500).json({ message: "Error updating bill" });
  }
};
