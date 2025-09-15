// server.js (ESM version)

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//import db from './config/database.js'; // ✅ Import shared DB pool
import app from './app.js';
//import { sequelize } from './models/index.js';
import db from './models/index.js';   // ✅ Import default db object
const { sequelize } = db;
import path from 'path';
import { fileURLToPath } from 'url';

import certificatesRouter from './routes/certificates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Trust proxy (for rate limiting / proxies like Nginx)
app.set("trust proxy", 1); // or true

// Health Check API
app.get('/', (req, res) => {
  res.json({ message: 'Certificate Verification API is running 🚀' });
});

app.use('/api/certificates', certificatesRouter);

// Serve frontend from /public folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route (for SPA like React/Vue)


// ✅ Express 5-compatible catch-all
// ✅ regex version (also works)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


/*
// Get certificate by student number
app.get('/api/certificate/:student_number', async (req, res) => {
  const { student_number } = req.params;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM certificates WHERE student_number = ?',
      [student_number]
    );

    if (rows.length > 0) {
      res.json({ success: true, data: rows[0] });
    } else {
      res.status(404).json({ success: false, message: 'Record not found' });
    }
  } catch (err) {
    console.error('❌ Database error details:', err); // full error object
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: err.message // return message to help debugging
    });
  }
});
*/
// Start Server
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

startServer();
