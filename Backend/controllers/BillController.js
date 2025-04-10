// import { Bill } from "../models/billModel";

import { billModel } from "../models/billModel.js";


export const BillController = async (req, res) => {
    const newBill = new billModel(req.body);
    try {
      await newBill.save();
      res.json({ message: "Bill added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error adding bill" });
    }
  };

