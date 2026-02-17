import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import jobRoutes from "./routes/jobs.js";
import uploadRoutes from "./routes/upload.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --------------- Middleware ---------------
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --------------- API Routes ---------------
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/upload", uploadRoutes);

// Health-check
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// --------------- Serve Frontend ---------------
const frontendDist = path.join(__dirname, "..", "frontend", "dist");
app.use(express.static(frontendDist));

// Catch-all: serve index.html for client-side routing
app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
});

// --------------- Connect & Start ---------------
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/proconnect";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });
