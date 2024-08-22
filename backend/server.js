const express = require('express');
const cors = require('cors');
// const sql = require('./config/mssql');
const conn = require('./config/postgreSql');
const redis = require('./config/redis');
const { readdirSync } = require('fs');
const passport = require('passport');
const expressLimit = require('express-rate-limit');
const { PrismaClient } = require('@prisma/client');
const authenticateApikey = require('./config/apikeyAuth');
const genSecretKey = require('./config/gensecret');
require('./routers/job');
require('dotenv').config();
require('./config/passport');

// init express app and set port
const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

//middleware options
let whitelist = ['http://localhost:4000', ``];
let corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS from server'));
        }
    }
};

const rateLimiter = expressLimit({
    windowMs: 15 * 60 * 1000,
	limit: 1000,
	standardHeaders: 'draft-7',
	legacyHeaders: false, 
    message: "req limit exceeded, please try again later.",
	// store: ... , // Redis, Memcached, etc. See below.
});

let ipAddress;

//init middleware
// app.use(cors(corsOptions));
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//express cors set up
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, X-API-KEY');
    next();
});

app.get('/', async (req, res) => {
    try {
        return res.status(200).json({ message: 'Welcome to Node.js and Express API!' });
    } catch (error) {
        return res.status(500).json({ 
            message: 'Server Error', 
            error: error.message 
        });
    }
});

// external api authenticate middleware func
const encryptApikey = async (req, res, next) => {
    try {
        const apiKey = req.headers['x-api-key'];

        if (!apiKey) {
            throw 'No API Key provided!';
        }

        const apiKeyData = await prisma.apikeys.findFirst({
            where: {
                ApiKey: apiKey,
            },
        });

        if (!apiKeyData) {
            throw 'Invalid API Key!';
        }

        const strorageApikey = apiKeyData.Apibcrypted;

        const compareApikey = await authenticateApikey(apiKey, strorageApikey);

        if (!apiKey || !strorageApikey || !compareApikey && compareApikey === false) {
            throw 'Unauthorized';
        }
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Error encrypting API key',
            error: error,
        });
    }
}

app.use('/v1/api/authenticate', require('./routers/auth'));
app.use('/contract', require('./routers/contract'));

//api middleware to authenticate jwt token and load routes
readdirSync('./routers').map((r) => app.use('/v1/api', passport.authenticate('jwt', {session: false}), require('./routers/' + r)));
console.log(readdirSync('./routers'))
// external api routes middleware func
readdirSync('./routers').map((r) => app.use('/v2/api', encryptApikey, require('./routers/' + r)));

// start express server and initialize database connected
app.listen(port, async () => {
    try {
        // sql;
        conn;
        redis;
        genSecretKey();
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ipAddress = data.ip;
        console.log(`🚀 ipAddress for your : ${ipAddress}`);
        console.log(`🚀 Server is running on port ${port}`);
    } catch (error) {
        console.log(`⚠️ server error: ${error}`);
    }
});

module.exports = app;