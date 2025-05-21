const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const Admin = sequelize.define('Admin', {
  Username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'admins',
  timestamps: false
});

module.exports = Admin;
