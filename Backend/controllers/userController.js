
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { userModel } from '../models/userModel.js';
import dotenv from 'dotenv';
import { billModel } from '../models/billModel.js';
dotenv.config();

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}

export const loginUser = async(req, res) =>{
    const {email, password} = req.body;
    if( !email || !password){
        return res.json({success:false, message: "Please enter all fields"});
    }

    try {
        let user = await userModel.findOne({email});

        if(!user){
            return res.status(404).json({success:false, message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({success:false, message: "Invalid Credentials"});
        }

        const token = createToken(user._id);
        return res.json({success:true, token});
    } catch (error) {
        console.log(error);
        return res.status(200).json({success:false, message: "Server Error"});
    }
}



export const registerUser = async (req, res) => {
    const { userName, email, password, confirmPassword, phone, address } = req.body;

    
    if (!userName || !email || !password || !confirmPassword || !phone || !address) {
        return res.status(400).json({ success: false, message: "Please enter all fields" });
    }

    
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Password should be at least 6 characters" });
    }

   
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    try {
        
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new userModel({
            userName,
            email,
            password: hashedPassword,
            phone,
            address,
        });

        await newUser.save();

        
        const token = createToken(newUser._id);

        return res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }

    
};

export const getMyBills = async (req, res) => {
    try {
      
  
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized - No user found in request" });
      }
  
      const userId = req.user._id; 
      const bills = await billModel.find({ userId: userId });
  
      res.json(bills);
    } catch (error) {
      console.error("Error fetching user bills:", error);
      res.status(500).json({ message: "Error fetching bills" });
    }
  };

  export const getAllBills = async (req, res) => {
    try {
      const bills = await billModel.find({});
      res.json(bills);
    } catch (error) {
      res.status(500).json({ message: "Error fetching all bills" });
    }
  };
  