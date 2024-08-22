const sql = require('mssql');
require('dotenv').config();

let config = {
    "user": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "server": process.env.DB_SERVER,
    "database": process.env.DB_NAME,
    "options": {
        "encrypt": false
    }
}

sql.connect(config, err => {
    try {
        if (err) {
            throw `⚠️ connect database error: ${err}`;
        }
        console.log("🚀 database connected successfully!");
    } catch (error) {
        console.log(err);
    }
});

module.exports = sql;