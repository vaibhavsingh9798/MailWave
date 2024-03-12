const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateUser = async (req) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new Error('Authentication token is missing');
  }

  try {

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(decoded.userId);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = authenticateUser;
