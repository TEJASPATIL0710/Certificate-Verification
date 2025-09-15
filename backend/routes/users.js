// routes/users.js
import express from 'express';
//import { User } from '../models/index.js';
//import User from '../models/user.js';   // ✅ use default import
import db from '../models/index.js';   // ✅ Import default db object
const { User } = db;

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all users (admin-only)
router.get('/', authMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Delete a user (admin-only)
router.delete('/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

export default router;
