const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password, accountName, dob, city, gender, mobile } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered. Please use a different email.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      accountName,
      dob,
      city,
      gender,
      mobile,
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Invalid user data. Please check all fields.' });
    } else {
      res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please sign up first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: user.username });
    console.log({ token, username: user.username });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// Profile Route
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Calculate age from dob
    const dob = new Date(user.dob);
    const age = new Date().getFullYear() - dob.getFullYear() - 
                (new Date().getMonth() < dob.getMonth() || 
                (new Date().getMonth() === dob.getMonth() && 
                new Date().getDate() < dob.getDate()));

    res.json({
      username: user.username,
      email: user.email,
      accountName: user.accountName,
      dob: user.dob,
      city: user.city,
      gender: user.gender,
      mobile: user.mobile,
      age,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// Update Profile Route
router.put('/profile', authenticateToken, async (req, res) => {
  const { username, email, accountName, dob, city, gender, mobile } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { username, email, accountName, dob, city, gender, mobile },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// Delete Profile Route
router.delete('/profile', authenticateToken, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

module.exports = router;