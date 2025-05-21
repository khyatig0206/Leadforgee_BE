const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const {createTestimonial, updateTestimonial, getAllTestimonials, deleteTestimonial, toggleTestimonialActiveStatus, getActiveTestimonials} = require("../controllers/testimonialController");

router.post('/', upload.single('image'),createTestimonial);

// Update
router.put('/:id', upload.single('image'),updateTestimonial);

router.put('/status/:id', toggleTestimonialActiveStatus);

// Read All
router.get('/', getAllTestimonials);
router.get('/active', getActiveTestimonials);

// Delete
router.delete('/:id',deleteTestimonial);


module.exports = router;