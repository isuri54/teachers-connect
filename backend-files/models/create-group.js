const mongoose = require("mongoose");

const CreateGroupSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    grade: { type: String, default: "No Grade" },
    description: { type: String },
    coverPhoto: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Create Group", CreateGroupSchema);