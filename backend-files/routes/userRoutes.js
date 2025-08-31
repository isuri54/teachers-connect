const express = require("express");
const user = require("../models/user");

const router = express.Router();

router.get("/:id", async (req, res) => {
    try {
        const { name, subject, school, profilePicture } = req.body;
        const User = await user.findByIdAndUpdate(
            req.params.id,
            { name, subject, school, profilePicture },
            { new: true }
        );
        res.json(User);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;