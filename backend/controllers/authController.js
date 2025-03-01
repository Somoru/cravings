import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      if (!process.env.JWT_SECRET) {
        console.error("❌ JWT_SECRET is missing! Check .env file.");
        return res.status(500).json({ message: "Server configuration error: Missing JWT_SECRET" });
      }
  
      // ✅ Create token with correct payload
      const token = jwt.sign(
        { id: user._id },  // Only store user ID in the token
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      res.json({ token, userId: user._id });
    } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  };