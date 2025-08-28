import express from "express";
import multer from "multer";
import createGroup from "../models/create-group";

const router = express.Router();

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage });

router.post("/", upload.single("coverPhoto"), async (req, res) => {
    try {
        const { name, subject, grade, description, userId } = req.body;

        const newGroup = new createGroup({
            name,
            subject,
            grade,
            description,
            userId,
            coverPhoto: req.file ? `/uploads/${req.file.filename}` : null,
        });

        await newGroup.save();
        res.status(201).json(newGroup);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;