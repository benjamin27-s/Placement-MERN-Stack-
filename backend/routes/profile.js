import { Router } from "express";
import User from "../models/User.js";
import Job from "../models/Job.js";
import auth from "../middleware/auth.js";

const router = Router();

// ---------- PUT /api/profile ----------
// Complete or update the user's profile (hirer or freelancer details)
router.put("/", auth, async (req, res) => {
    try {
        const { type, hirer, freelancer } = req.body;

        if (!type || !["hirer", "freelancer"].includes(type)) {
            return res.status(400).json({ message: "type must be 'hirer' or 'freelancer'" });
        }

        const update = {
            type,
            completed: true,
            hirer: type === "hirer" ? hirer : null,
            freelancer: type === "freelancer" ? freelancer : null,
        };

        const user = await User.findByIdAndUpdate(req.userId, update, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });

        // If hirer, automatically create a job posting from their profile
        if (type === "hirer" && hirer) {
            const existingJob = await Job.findOne({ postedBy: user._id });
            if (!existingJob) {
                // Gather skills from all roles
                const allSkills = (hirer.roles || [])
                    .flatMap((r) =>
                        String(r.skills || "")
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                    );

                await Job.create({
                    postedBy: user._id,
                    companyName: hirer.companyName || "",
                    companyCountry: hirer.companyCountry || "",
                    projectTitle: hirer.projectTitle || "",
                    projectType: hirer.projectType || "",
                    projectDescription: hirer.projectDescription || "",
                    teamSize: hirer.teamSize || "1",
                    budgetRange: hirer.budgetRange || "",
                    timeline: hirer.timeline || "",
                    roles: (hirer.roles || []).map((r) => ({
                        title: r.title,
                        count: Number(r.count) || 1,
                        skills: r.skills || "",
                    })),
                    skills: [...new Set(allSkills)],
                    category: (hirer.projectType || "Web App").toLowerCase().includes("mobile")
                        ? "mobile"
                        : (hirer.projectType || "").toLowerCase().includes("ai")
                            ? "aiml"
                            : "fullstack",
                });
            }
        }

        res.json({ user });
    } catch (err) {
        console.error("Profile update error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
