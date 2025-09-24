// routes/uploads.js
import express from 'express';
import multer from 'multer';
//import { Upload } from '../models/index.js';
import db from '../models/index.js';   // ✅ Import default db object
const { Upload } = db;
import { authenticate } from '../middleware/authMiddleware.js';
import path from 'path';
import { saveUpload, getUploads } from '../controllers/uploadController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), saveUpload); // No authentication required for uploads
router.get('/',  getUploads);

export default router;

/*
const router = express.Router();
const upload = multer({ dest: path.join('uploads/') });

// Upload file
router.post('/', authenticate, upload.single('file'), async (req, res) => {
  try {
    const newUpload = await Upload.create({
      filename: req.file.originalname,
      path: req.file.path,
      userId: req.user.id,
    });
    res.json({ success: true, upload: newUpload });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// List uploads for logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const uploads = await Upload.findAll({ where: { userId: req.user.id } });
    res.json({ success: true, uploads });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
*/