const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { Username: username } });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isMatch = password === admin.password; 

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.Username, role: 'admin' },
      JWT_SECRET,
    );

    return res.status(200).json({
      token,
      user: {
        id: admin.id,
        username: admin.Username,
        role: 'admin'
      },
    });
  } catch (error) {
    console.error('Admin login failed:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
