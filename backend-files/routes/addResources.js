const express = require("express");
const multer = require("multer");
const AddResource = require("../models/add-resource")

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resources");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, description, subject, userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newResource = new Resource({
      title,
      description,
      subject,
      fileUrl: `/uploads/resources/${req.file.filename}`,
      uploadedBy: userId,
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (error) {
    console.error("Error uploading resource:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const resources = await AddResource.find().populate("uploadedBy", "name email");
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const resource = await AddResource.findById(req.params.id).populate("uploadedBy", "name email");
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
