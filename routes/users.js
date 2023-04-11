// Part 1
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';

// Register
router.post('/register', async (req, res) => {
  const { username, password, userType } = req.body;
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const newUser = new User({ username, password, userType });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      await newUser.save();
      res.json({ msg: 'User registered successfully' });
    });
  });
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ msg: 'User not found' });
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) throw err;

    if (isMatch) {
      const payload = {
        id: user.id,
        username: user.username,
        userType: user.userType,
      };
      jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
        res.json({ token });
      });
    } else {
      res.status(400).json({ msg: 'Incorrect password' });
    }
  });
});

module.exports = router;
