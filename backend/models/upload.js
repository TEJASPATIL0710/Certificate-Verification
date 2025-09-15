// models/upload.js

import { DataTypes } from 'sequelize';


export default (sequelize,DataTypes) => {
  const Upload = sequelize.define('Upload', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploaded_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upload_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    tableName: 'uploads',
    timestamps: true,
  });

  return Upload;
};
