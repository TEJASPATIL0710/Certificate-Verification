// app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
//import swaggerUi from 'swagger-ui-express';
//import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import certificateRoutes from './routes/certificates.js';
import uploadRoutes from './routes/uploads.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security & Middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 500 }));

// Swagger Setup

//const swaggerDoc = YAML.load(path.join(__dirname, 'swagger.yaml'));

//const swaggerDoc = YAML.load(path.join(__dirname, 'swagger.yaml'));
//app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// API Routes (always use relative paths)
console.log('Mounting /auth routes');
app.use('/auth', authRoutes);

console.log('Mounting /api/certificates routes');
app.use('/api/certificates', certificateRoutes);

console.log('Mounting /api/Upload routes');

app.use('/api/uploads', uploadRoutes);

// Serve static frontend
const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

export default app;
