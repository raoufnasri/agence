import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new user
// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

 
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email is already registered" });
    }

  
    const hashedPassword = await bcrypt.hash(password, 10);
    
   
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

   
    return res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {

    return res.status(400).json({ success: false, message: error.message });
  }
};


// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({success : false,  message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({success : false, message: "Invalid password" });
    }
   // const token = jwt.sign({ id: user._id, role: user.role }, "dffvvdsfrefegfdv245ds", { expiresIn: "3d" });
   return res.status(200).json({success: true ,  user});
  } catch (error) {
   return res.status(500).json({success : false,  error: error.message });
  }
};
