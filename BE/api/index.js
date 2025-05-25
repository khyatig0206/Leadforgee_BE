const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const { connectDB } = require('../configs/db');
const path = require('path');
const adminroutes = require("../routes/adminroutes");
const testimonialRoutes = require("../routes/testimonialRoutes");
const serverless = require('serverless-http');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/admin', adminroutes);
app.use('/api/testimonial', testimonialRoutes);

(async () => {
  await connectDB();
})();

module.exports = serverless(app);
