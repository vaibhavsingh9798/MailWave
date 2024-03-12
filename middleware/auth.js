const jwt = require('jsonwebtoken');
const { redisClient, getFromCache, setexInCache } = require('../services/redis');
const User = require('../models/user');

async function authenticateUser(req) {
  const token = req.headers.authorization || '';
  if (!token) {
    return null;
  }

  try {
    const cachedUser = await getFromCache(token);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.userId);

    await setexInCache(token, 3600, JSON.stringify(currentUser));

    return currentUser;
  } catch (error) {
    return null;
  }
}

module.exports = { authenticateUser };
