import mongoose from "mongoose";

const addResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: String, enum: ["Maths", "Science", "English", "Sinhala"], required: true },
    fileUrl: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Add Resource", addResourceSchema);