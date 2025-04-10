import express from 'express';
import { getAllBills, getMyBills, loginUser, registerUser } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleWare.js';

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/my-bills",authMiddleware, getMyBills);
userRouter.get("/all-bills", getAllBills)

export default userRouter;