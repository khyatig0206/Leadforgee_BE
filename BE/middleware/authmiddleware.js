const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ detail: "Authorization token missing" });
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
  
      req.adminId = decoded.userId;
      next();
    } catch (err) {
      return res.status(401).json({ detail: "Invalid or expired token" });
    }
  };
  
module.exports = { adminAuth};
