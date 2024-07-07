const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/userSchema');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Name, email, and password are required');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).send(`User registered with ID: ${user.id}`);
  } catch (err) {
    console.error('Error inserting user:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }

    res.status(200).send(`User logged in with ID: ${user.id}`);
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
