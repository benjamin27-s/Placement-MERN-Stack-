import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

const signToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });

// ---------- POST /api/auth/signup ----------
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username?.trim() || !email?.trim() || !password) {
            return res.status(400).json({ message: "Username, email, and password are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingEmail) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const existingUsername = await User.findOne({ username: username.trim() });
        if (existingUsername) {
            return res.status(409).json({ message: "Username already taken" });
        }

        const user = await User.create({
            username: username.trim(),
            email: email.toLowerCase().trim(),
            password,
        });

        const token = signToken(user._id);
        res.status(201).json({ token, user });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ---------- POST /api/auth/login ----------
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email?.trim() || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = signToken(user._id);
        res.json({ token, user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ---------- GET /api/auth/me ----------
router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ user });
    } catch (err) {
        console.error("Get me error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
