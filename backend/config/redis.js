const redis = require('redis');
require('dotenv').config();

console.log('Redis Host:', process.env.REDIS_HOST || 'redis');
console.log('Redis Port:', process.env.REDIS_PORT || 6379);

const client = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

client.on('error', (err) => {
    console.error(`⚠️ Error connecting to Redis: ${err}`);
});

client.on('connect', () => {
    console.log('🚀 Connected to Redis');
});

client.connect().catch((err) => {
    console.error(`❌ Failed to connect to Redis: ${err}`);
});

module.exports = client;