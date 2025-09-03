const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user'); // Use the existing User model

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).send("Server error");
    }
});

// PATCH update user by ID (corrected from GET to PATCH)
router.patch("/:id", async (req, res) => {
    try {
        const { name, subject, school, profilePicture } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, subject, school, profilePicture },
            { new: true, runValidators: true } // Ensures schema validation
        );
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;