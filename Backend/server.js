import express from 'express';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import { BillController } from './controllers/BillController.js';
import userRouter from './router/userRoute.js';
// import { Bill } from './models/billModel.js';
import cors from 'cors';
import adminRouter from './router/adminRouter.js';
import complaintRouter from './router/complaintRouter.js';


dotenv.config();

const app = express();
app.use(express.json());
// const router = express.Router();
const port = 3000;
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Hello World");
})

// app.use("/api/bills", BillController);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/admin", complaintRouter);


app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running on http://localhost:${port}`);
})