// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
//import { User } from '../models/index.js';
import db from '../models/index.js';   // ✅ Import default db object
const { User } = db;

// Middleware to verify JWT token
export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user; // Attach user to request
    next();
  } catch (err) {
    console.error('❌ Token verification error:', err);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

// Middleware to check admin role
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
  }
  next();
};
