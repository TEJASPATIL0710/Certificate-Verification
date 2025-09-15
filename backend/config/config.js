// config/config.js
import dotenv from 'dotenv';
dotenv.config();

const config = {
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Aadya@1306',
    database: process.env.DB_NAME || 'certificate_verification',
    port: process.env.DB_PORT || 3306,
  },
};

export default config;
