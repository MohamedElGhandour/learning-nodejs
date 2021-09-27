const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

// Generate a token from a payload
const generateToken = (payload) => jwt.sign(payload, SECRET_KEY);

// Verify the token
const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

module.exports = { generateToken, verifyToken };
