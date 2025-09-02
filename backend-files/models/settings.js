const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  notifications: { type: Boolean, default: true },
  darkMode: { type: Boolean, default: false },
});

module.exports = mongoose.model("Settings", SettingsSchema);
