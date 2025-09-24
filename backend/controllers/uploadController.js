// controllers/uploadController.js
import db from '../models/index.js';

const { Upload } = db;

// ✅ Save uploaded file reference in DB
export const saveUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { originalname: filename } = req.file; // req.file comes from multer

    const upload = await Upload.create({
      filename,
      uploaded_by: req.user?.id || 'anonymous',
      upload_time: new Date().toISOString()
    });

    res.status(201).json({ success: true, data: upload });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ success: false, message: 'Error saving upload', error: err.message });
  }
};

// ✅ Get all uploaded files
export const getUploads = async (req, res) => {
  try {
    const uploads = await Upload.findAll();
    res.json({ success: true, data: uploads });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching uploads', error: err.message });
  }
};
