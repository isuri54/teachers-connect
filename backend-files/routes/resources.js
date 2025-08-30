const express = require("express");
const router = express.Router();
const Resource = require("../models/resource");
const { model } = require("mongoose");

router.get("/", async (req, res) => {
    try {
        const { subject } = req.query;
        const resources = await Resource.find(subject ? { subject } : {});
        res.json(resources);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, subject, description, userId } = req.body;
        const resource = new Resource({
            title,
            subject,
            description,
            createdBy: userId,
        });
        await resource.save();
        res.json(resource);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

model.exports = router;