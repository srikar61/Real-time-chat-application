const express = require('express');
const User = require('../models/User');  // Assuming the User model is in the 'models' directory
const bcrypt = require('bcryptjs');

const router = express.Router();

// POST: User signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, accountname, dob, city, phoneno, gender } = req.body;

    // Validate required fields
    if (!username || !email || !password || !dob || !city || !phoneno || !gender) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      accountname,
      dob: new Date(dob),  // Convert string date into Date object
      city,
      phoneno,
      gender
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: 'Signup successful.' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// POST: User login (you can add this for login functionality)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Send success response (in a real app, you would generate a token here)
    res.status(200).json({ message: 'Login successful.' });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
