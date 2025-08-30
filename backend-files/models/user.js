const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    school: { type: String },
    subject: { type: String, required: true },
    profilePicture: { type: String, default: "" },
    createdAt: { type: String, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);