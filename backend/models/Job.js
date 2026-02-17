import mongoose from "mongoose";

const jobRoleSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        count: { type: Number, default: 1 },
        skills: { type: String, default: "" },
    },
    { _id: false }
);

const jobSchema = new mongoose.Schema(
    {
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        companyName: { type: String, required: true },
        companyCountry: { type: String, default: "" },
        projectTitle: { type: String, required: true },
        projectType: { type: String, default: "" },
        projectDescription: { type: String, default: "" },
        teamSize: { type: String, default: "1" },
        budgetRange: { type: String, default: "" },
        timeline: { type: String, default: "" },
        roles: [jobRoleSchema],
        skills: [{ type: String }],
        category: { type: String, default: "fullstack" },
    },
    { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
