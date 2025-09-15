// controllers/certificateController.js
import db from '../models/index.js';

const { Certificate } = db;

// ✅ Create a certificate record
export const createCertificate = async (req, res) => {
  try {
    const { student_number, year_of_passing, branch, name } = req.body;

    const cert = await Certificate.create({
      student_number,
      year_of_passing,
      branch,
      name
    });

    res.status(201).json({ success: true, data: cert });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating certificate', error: err.message });
  }
};

// ✅ Get all certificates
export const getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.findAll();
    res.json({ success: true, data: certs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching certificates', error: err.message });
  }
};

// ✅ Verify certificate by student number
export const verifyCertificate = async (req, res) => {
  try {
    const { student_number } = req.params;

    const cert = await Certificate.findOne({ where: { student_number } });

    if (!cert) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    res.json({ success: true, data: cert });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error verifying certificate', error: err.message });
  }
};
