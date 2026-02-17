import { Router } from "express";
import Job from "../models/Job.js";
import User from "../models/User.js";
import auth from "../middleware/auth.js";

const router = Router();

// ---------- POST /api/jobs ----------
router.post("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        if (user.type !== "hirer") {
            return res.status(403).json({ message: "Only hirers can post jobs" });
        }

        const {
            companyName,
            companyCountry,
            projectTitle,
            projectType,
            projectDescription,
            teamSize,
            budgetRange,
            timeline,
            roles,
            skills,
            category,
        } = req.body;

        const job = await Job.create({
            postedBy: user._id,
            companyName: companyName || user.hirer?.companyName || "",
            companyCountry: companyCountry || user.hirer?.companyCountry || "",
            projectTitle: projectTitle || "",
            projectType: projectType || "",
            projectDescription: projectDescription || "",
            teamSize: teamSize || "1",
            budgetRange: budgetRange || "",
            timeline: timeline || "",
            roles: roles || [],
            skills: skills || [],
            category: category || "fullstack",
        });

        res.status(201).json({ job });
    } catch (err) {
        console.error("Create job error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ---------- GET /api/jobs ----------
router.get("/", async (req, res) => {
    try {
        const { category, limit = 20 } = req.query;
        const filter = {};
        if (category) filter.category = category;

        const jobs = await Job.find(filter)
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .populate("postedBy", "username email");

        res.json({ jobs });
    } catch (err) {
        console.error("Get jobs error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// ---------- GET /api/jobs/freelancers ----------
router.get("/freelancers", async (req, res) => {
    try {
        const { skill, limit = 20 } = req.query;
        const filter = { type: "freelancer", completed: true };

        let users = await User.find(filter)
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .select("-password");

        // Optional client-side skill filtering
        if (skill) {
            const lowerSkill = skill.toLowerCase();
            users = users.filter((u) =>
                String(u.freelancer?.skills || "")
                    .toLowerCase()
                    .includes(lowerSkill)
            );
        }

        res.json({ freelancers: users });
    } catch (err) {
        console.error("Get freelancers error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
