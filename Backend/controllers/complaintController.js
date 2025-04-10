import { complaintModel } from "../models/complaintModel.js";

export const submitComplaint = async (req, res) => {
  try {
    const { complaintType, description } = req.body;
    const newComplaint = new complaintModel({
      userId: req.user._id,
      complaintType,
      description,
    });

    await newComplaint.save();

    res
      .status(201)
      .json({ success: true, message: "Complaint submitted successfully" });
  } catch (err) {
    res
      .staus(500)
      .json({ success: false, message: "Failed to submit complaint." });
  }
};

export const getUserComplaintsById = async (req, res) => {
  try {
    const userId = req.user ? req.user._id : req.params.userId;
    const complaints = await complaintModel.find({ userId });
    res.json(complaints);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch complaints" });
  }
};

export const updateComplaintStatus = async (req, res) => {
  const { complaintId } = req.params;
  const { status } = req.body;
  try {
    const updatedComplaint = await complaintModel.findByIdAndUpdate(
      complaintId,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(updatedComplaint);
  } 
  
  catch (err) {
    res.status(500).json({ success: false, message: "Failed to update complaint status" });
  }
};
