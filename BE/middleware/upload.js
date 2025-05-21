// BE/middlewares/upload.js

const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/testimonials/'),
  filename: (req, file, cb) => cb(null, `${uuidv4()}-${file.originalname}`)
});

module.exports = multer({ storage });
