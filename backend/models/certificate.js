// models/certificate.js

export default (sequelize,DataTypes) => {
  const Certificate = sequelize.define('Certificate', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    student_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year_Of_passing: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    score: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  }, {
    tableName: 'certificates',
      timestamps: false,   // ✅ turn off createdAt & updatedAt
  });

  return Certificate;
};
