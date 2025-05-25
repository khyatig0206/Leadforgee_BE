const Testimonial = require("../models/Testimonial");
const fs = require("fs");
const path = require("path");
const { cloudinary } = require('../configs/cloudinary');

exports.createTestimonial = async (req, res) => {
  try {
    const { name, position, company, content, rating, active } = req.body;

    const imageUrl = req.file ? req.file.path : "";
    const cloudinaryId = req.file ? req.file.filename : "";

    const testimonial = new Testimonial({
      name,
      position,
      company,
      content,
      rating: Number(rating),
      active: active === "true",
      imageUrl,
      cloudinaryId,
    });

    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: "Failed to create testimonial", error: err.message });
  }
};



exports.updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, company, content, rating, active } = req.body;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial)
      return res.status(404).json({ message: "Testimonial not found" });

    // Delete old image if new one is uploaded
    if (req.file && testimonial.cloudinaryId) {
      await cloudinary.uploader.destroy(testimonial.cloudinaryId);
    }

    testimonial.name = name;
    testimonial.position = position;
    testimonial.company = company;
    testimonial.content = content;
    testimonial.rating = Number(rating);
    testimonial.active = active === "true";

    if (req.file) {
      testimonial.imageUrl = req.file.path;
      testimonial.cloudinaryId = req.file.filename;
    }

    await testimonial.save();
    res.status(200).json(testimonial);
  } catch (err) {
    res.status(500).json({ message: "Failed to update testimonial", error: err.message });
  }
};

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch testimonials", error: err.message });
  }
};



exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial)
      return res.status(404).json({ message: "Testimonial not found" });

    // Delete image from Cloudinary if exists
    if (testimonial.cloudinaryId) {
      await cloudinary.uploader.destroy(testimonial.cloudinaryId);
    }

    await testimonial.deleteOne();
    res.status(204).end();
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete testimonial", error: err.message });
  }
};


exports.toggleTestimonialActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    testimonial.active = active;
    await testimonial.save();

    res.status(200).json(testimonial);
  } catch (err) {
    res.status(500).json({
      message: "Failed to update testimonial status",
      error: err.message,
    });
  }
};

exports.getActiveTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ active: true }).sort({
      createdAt: -1,
    });
    res.status(200).json(testimonials);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch active testimonials",
      error: err.message,
    });
  }
};
