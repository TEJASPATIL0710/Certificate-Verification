// models/index.js
import { Sequelize } from 'sequelize';
import userModel from './user.js';
import certificateModel from './certificate.js';
import uploadModel from './upload.js';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize models
db.User = userModel(sequelize, Sequelize.DataTypes);
db.Certificate = certificateModel(sequelize, Sequelize.DataTypes);
db.Upload = uploadModel(sequelize, Sequelize.DataTypes);

// Associations (uncomment if you want relationships)
//db.User.hasMany(db.Upload, { foreignKey: 'userId', onDelete: 'CASCADE' });
//db.Upload.belongsTo(db.User, { foreignKey: 'userId' });

//db.User.hasMany(db.Certificate, { foreignKey: 'userId', onDelete: 'CASCADE' });
//db.Certificate.belongsTo(db.User, { foreignKey: 'userId' });

export default db;
