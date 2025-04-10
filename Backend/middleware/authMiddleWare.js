import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
     // Log token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    req.user = await userModel.findById(decoded.id).select("-password");

    // Log fetched user

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("🚨 Invalid Token:", error.message);
    res.status(401).json({ message: "Invalid Token" });
  }
};
