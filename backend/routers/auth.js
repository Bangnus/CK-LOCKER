const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
require('dotenv').config();
 
const router = express.Router();
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const SecretJWT = process.env.SECRET_JWT;

router.post('/signin', (req, res, next) => {
    try {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err) return next(err);
            if (user) {
                const authToken = jwt.sign({user: user}, SecretJWT, { expiresIn: '1h'});
                return res.status(200).json({
                    message: "Login successful",
                    body: user,
                    authToken: authToken,
                });
            } else {
                return res.status(422).json(info);
            }
        })(req, res, next);
    } catch (error) {
        return res.status(401).json({
            message: "Invalid username or password",
            error: error,
        })
    }
});

router.post('/createUser', async (req, res) => {
    try {
        const { username, name, passoword, email, userZone, userBranch, userRole } = req.body;
        const hashPassword = await bcrypt.hashSync(passoword, 10);

        const reCheckUser = await prisma.users.findFirst({
            where: {
                username: username,
            }
        });

        if (reCheckUser) {
            throw  "user already exists!";
        }

        const newUser = await prisma.users.create({
            data: {
                name: name,
                username: username,
                password: hashPassword,
                passwordToken: passoword,
                email: email,
                user_zone: userZone,
                user_branch: userBranch,
                user_role: userRole,
            }
        });

        return res.status(201).json({
            message: "createUser success",
            body: newUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: "createUser false",
            errMsg: error
        });
    }
});

router.post('/apikey/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const authTokenHeader = req.headers['authorization'];
        const authToken = authTokenHeader && authTokenHeader.split(' ')[1];

        if (!authToken) {
            throw 'No token provided!';
        }

        const encryptToken = CryptoJS.AES.encrypt(JSON.stringify(authToken), process.env.SECRET_JWT).toString();
        const hashapikey = bcrypt.hashSync(encryptToken, 10);

        const response = await prisma.apikeys.create({
            data: {
                UserInsert: Number(id),
                ApiKey: encryptToken,
                Apibcrypted: hashapikey,
            }
        });

        return res.status(201).json({
            message: 'generate api key success',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'generate api key faild',
            error: error,
        });
    }
});

router.get('/apikey/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await prisma.apikeys.findMany({
            where: {
                UserInsert: Number(id),
            }
        });

        if (response === null) throw 'api key not found!';

        return res.status(200).json({
            message: 'get api key success',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'get api key faild',
            error: error,
        });
    }
});

router.delete('/apikey/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await prisma.apikeys.delete({
            where: {
                id: Number(id),
            }
        });

        return res.status(200).json({
            message: 'delete api key success',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'delete api key faild',
            error: error,
        });
    }
});

module.exports = router;