const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {check, validationResult} = require("express-validator");
const User = require("../models/user");

const router = express.Router();

const JWT_SECRET = "supersecretkey";

router.post(
    "/signup",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password must be 8+ chars").isLength({min: 8}),
        check("subject", "Subject is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

        const { name, email, password, school, subject } = req.body;

        try {
            let user = await User.findOne({email});
            if (user) return res.status(400).json({ msg: "User already exists" });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            user = new User ({
                name,
                email,
                password: hashedPassword,
                school,
                subject
            });

            await user.save();

            const payload = { user: {id: user.id, name: user.name }};
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

            res.json({ token, user: {id: user.id, name: user.name, email: user.email, school: user.school, subject: user.subject }});
        
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

      const payload = { user: { id: user.id, email: user.email } };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

      res.json({ token, user: { id: user.id, name: user.name, email: user.email, school: user.school, subject: user.subject } });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;