const cryptoJs = require('crypto-js');
const crypto = require('crypto');
require('dotenv').config();

async function genSecretKey() {
    try {
        const reCheck = await process.env.SECRET_JWT;
        if (reCheck !== 'genToken') {
            return null;
        } else {
            const randomKey = await crypto.randomBytes(32).toString('hex');
            const secretKey = await cryptoJs.SHA256(randomKey).toString();
            const secret = `🔐 Secret key for SECRET_JWT middleware: ${secretKey}`;
            console.log(secret);
        }
    } catch (error) {
        console.log(`generate key error: ${error}`);
    }
};

module.exports = genSecretKey;