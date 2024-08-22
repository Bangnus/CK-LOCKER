const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME, 
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 20, 
    idleTimeoutMillis: 30000,
});

pool.connect((err, client, done) => {
    if (err) {
        console.error('⚠️ Error connecting to the database', err);
        return;
    }
    console.log('🚀 Connected to the PostgreSQL database');
});

module.exports = pool;