import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const roleSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        count: { type: String, default: "1" },
        skills: { type: String, default: "" },
    },
    { _id: false }
);

const hirerSchema = new mongoose.Schema(
    {
        companyName: { type: String, default: "" },
        companyCountry: { type: String, default: "" },
        companyWebsite: { type: String, default: "" },
        projectTitle: { type: String, default: "" },
        projectType: { type: String, default: "" },
        projectDescription: { type: String, default: "" },
        teamSize: { type: String, default: "1" },
        budgetRange: { type: String, default: "" },
        timeline: { type: String, default: "" },
        roles: [roleSchema],
    },
    { _id: false }
);

const freelancerSchema = new mongoose.Schema(
    {
        fullName: { type: String, default: "" },
        country: { type: String, default: "" },
        city: { type: String, default: "" },
        professionalTitle: { type: String, default: "" },
        skills: { type: String, default: "" },
        yearsExp: { type: String, default: "" },
        portfolioUrl: { type: String, default: "" },
        bio: { type: String, default: "" },
        resumeUrl: { type: String, default: "" },
        linkedinUrl: { type: String, default: "" },
        linkedinPdfUrl: { type: String, default: "" },
    },
    { _id: false }
);

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true, lowercase: true },
        password: { type: String, required: true, minlength: 6 },
        type: { type: String, enum: ["hirer", "freelancer", null], default: null },
        completed: { type: Boolean, default: false },
        hirer: { type: hirerSchema, default: null },
        freelancer: { type: freelancerSchema, default: null },
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password helper
userSchema.methods.comparePassword = function (candidate) {
    return bcrypt.compare(candidate, this.password);
};

// Strip password from JSON output
userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model("User", userSchema);
