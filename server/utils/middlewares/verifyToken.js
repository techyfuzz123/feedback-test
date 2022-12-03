const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT;

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token_value = cookies?.split("=")[1];
  if (!token_value) {
    return res.status(404).json({ message: "No token found" });
  }
  jwt.verify(String(token_value), JWT_SECRET_KEY, (err, student) => {
    if (err) {
      return res.status(400).json(err);
    }
    req.regno = student.regno;
  });
  next();
};

module.exports = verifyToken