const multer = require('multer');
const { storage } = require('../configs/cloudinary');

module.exports = multer({ storage });
