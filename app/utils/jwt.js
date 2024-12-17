const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  if (!user || !user.id || !user.email) {
    throw new Error("Payload must contain 'id' and 'email'");
  }

  const payload = {
    id: user.id, 
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
