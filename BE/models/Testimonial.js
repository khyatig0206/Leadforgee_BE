const { DataTypes } = require('sequelize');
const { sequelize } = require('../configs/db');

const Testimonial = sequelize.define('Testimonial', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 }
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
  tableName: 'testimonials',
}
);

module.exports = Testimonial