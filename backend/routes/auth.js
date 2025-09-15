// routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';
//import { User } from '../models/index.js';   // ✅ correct import
import db from '../models/index.js';   // ✅ Import default db object
const { User } = db;

import { register, login } from '../controllers/authController.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
export default router;

/*
// Register new user (admin only)
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const user = await User.create({
      username,
      password,
      role: role || 'user',
      // store password securely if you add password to model (hash it)
    });

    //const { username, password, role } = req.body;
    //const user = await User.create({ username, password, role });
    //res.json({ success: true, user });
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
*/