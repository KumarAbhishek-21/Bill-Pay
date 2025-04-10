
import express from 'express';
// import { authMiddleware } from "../middleware/authMiddleWare";
import { getUserComplaintsById, submitComplaint, updateComplaintStatus } from '../controllers/complaintController.js';
import { authMiddleware } from '../middleware/authMiddleWare.js';

const complaintRouter = express.Router();

complaintRouter.post("/submit-complaint", authMiddleware, submitComplaint);
complaintRouter.get("/my-complaints",  authMiddleware, getUserComplaintsById);
complaintRouter.get("/complaints/:userId", getUserComplaintsById);
complaintRouter.patch("/complaints/:complaintId/status", updateComplaintStatus);

export default complaintRouter;