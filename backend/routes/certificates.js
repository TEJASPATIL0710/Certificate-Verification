// routes/certificates.js
import express from 'express';
//import { Certificate } from '../models/index.js';
//import Certificate from '../models/certificate.js';
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';
import db from '../models/index.js';
import { createCertificate, getCertificates, verifyCertificate } from '../controllers/certificateController.js';

const router = express.Router();
const { Certificate } = db;
router.post('/', createCertificate);
router.get('/', getCertificates);
router.get('/:student_number', verifyCertificate);

/*
// GET all certificates
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.findAll();
    res.json({ success: true, data: certificates });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// Get certificate by student number
router.get('/:student_number', authenticate, async (req, res) => {
  try {
    const cert = await Certificate.findOne({ where: { student_number: req.params.student_number } });
    if (!cert) return res.status(404).json({ success: false, message: 'Certificate not found' });
    res.json({ success: true, certificate: cert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create certificate (admin only)
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const cert = await Certificate.create(req.body);
    res.json({ success: true, certificate: cert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


/*
// POST new certificate
router.post('/', async (req, res) => {
  try {
    const { studentNumber, yearOfPassing, branch, name } = req.body;
    const cert = await Certificate.create({ studentNumber, yearOfPassing, branch, name });
    res.status(201).json({ success: true, data: cert });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
*/


export default router;
