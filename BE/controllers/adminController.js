const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Use Mongoose to find admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Simple password comparison (replace with bcrypt in production)
    const isMatch = password === admin.password;

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: 'admin' },
      JWT_SECRET
    );

    return res.status(200).json({
      token,
      user: {
        id: admin._id,
        username: admin.username,
        role: 'admin'
      },
    });
  } catch (error) {
    console.error('Admin login failed:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
