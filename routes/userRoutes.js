const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Add new user
router.post('/', async (req, res) => {
  try {
    const { name, phone, location } = req.body;
    const newUser = new User({ name, phone, location });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
