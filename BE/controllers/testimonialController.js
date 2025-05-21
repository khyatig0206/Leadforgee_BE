const Testimonial = require("../models/Testimonial"); // Adjust import if using model/index.js
const fs = require('fs');
const path = require('path');

exports.createTestimonial = async (req, res) => {
  try {
    const { name, position, company, content, rating, active } = req.body;

    const imageUrl = req.file
      ? `/uploads/testimonials/${req.file.filename}`
      : '';

    const testimonial = await Testimonial.create({
      name,
      position,
      company,
      content,
      rating: Number(rating),
      active: active === 'true',
      imageUrl
    });

    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create testimonial', error: err.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, company, content, rating, active } = req.body;

    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    const imageUrl = req.file
      ? `/uploads/testimonials/${req.file.filename}`
      : testimonial.imageUrl;

    await testimonial.update({
      name,
      position,
      company,
      content,
      rating: Number(rating),
      active: active === 'true',
      imageUrl
    });

    res.status(200).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update testimonial', error: err.message });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch testimonials', error: err.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    // Delete associated image file
    if (testimonial.imageUrl) {
      const imagePath = path.join(__dirname, '..', testimonial.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) console.error(`Failed to delete image file: ${err.message}`);
      });
    }

    await testimonial.destroy();
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete testimonial', error: err.message });
  }
};


exports.toggleTestimonialActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    testimonial.active = active;
    await testimonial.save();

    res.status(200).json(testimonial);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update testimonial status',
      error: err.message,
    });
  }
};


exports.getActiveTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: { active: true },
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch active testimonials', error: err.message });
  }
};
