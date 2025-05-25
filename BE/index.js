const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const { connectDB } = require('./configs/db');
const path = require('path');
const adminroutes = require("./routes/adminroutes");
const testimonialRoutes = require("./routes/testimonialRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/admin', adminroutes);
app.use('/api/testimonial', testimonialRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
})();