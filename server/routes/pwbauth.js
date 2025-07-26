import express from "express";
import jwt from "jsonwebtoken";
import User from "../model/pwbuser.js";

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phone_number,
      address,
      userType,
      techStack,
      workedProjects,
      company,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // Create new user
    const userData = {
      username,
      email,
      password,
      phone_number,
      address,
      userType,
    };

    if (userType === "freelancer") {
      userData.techStack = techStack;
      userData.workedProjects = workedProjects;
    } else if (userType === "client") {
      userData.company = company;
    }

    const user = new User(userData);
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    // Find user
    const user = await User.findOne({ email, userType });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, userType: user.userType },
      process.env.JWT_SECRET || "your-secret-key",
      {
        expiresIn: "7d",
      }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Logout
router.post("/logout", async (req, res) => {
  try {
    // In a real app, you might want to blacklist the token
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout" });
  }
});

export default router;
