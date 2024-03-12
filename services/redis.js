const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

function getFromCache(key, callback) {
  redisClient.get(key, (err, data) => {
    if (err) {
      console.error('Error getting data from Redis:', err);
      return callback(err);
    }
    callback(null, data);
  });
}

function setexInCache(key, expiryInSeconds, value, callback) {
  redisClient.setex(key, expiryInSeconds, value, (err, result) => {
    if (err) {
      console.error('Error setting data in Redis:', err);
      return callback(err);
    }
    callback(null, result);
  });
}

module.exports = { redisClient, getFromCache, setexInCache };
