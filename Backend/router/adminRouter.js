import express from 'express';
import { addBill, deleteBill, getUserBills, getUsers, updateBill, updateBillStatus } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.get("/users", getUsers);
adminRouter.get("/bills/:userId", getUserBills);
adminRouter.post("/bills/:userId", addBill);
adminRouter.put("/bills/:billId", updateBillStatus);
adminRouter.delete("/bills/delete/:billId", deleteBill);
adminRouter.put("/bills/edit/:billId", updateBill);

export default adminRouter;