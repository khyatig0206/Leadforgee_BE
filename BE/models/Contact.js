const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  viewed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'contacts',
  timestamps: true,
});

module.exports = Contact;
