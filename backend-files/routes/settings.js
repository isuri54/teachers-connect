const express = require("express");
const Settings = require("../models/settings");
const { model } = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (settings) {
      settings.set(req.body);
      await settings.save();
    } else {
      settings = new Settings(req.body);
      await settings.save();
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

model.exports = router;
