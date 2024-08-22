const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const RedisClient = require('../config/redis');
const bcrypt = require('bcrypt');
require('dotenv').config();

const router = express.Router();
const prisma = new PrismaClient();
const SecretJWT = process.env.SECRET_JWT;

router.get('/fetchUser', async (req, res) => {
    try {
        const authTokenHeader = req.headers['authorization'];
        const authToken = authTokenHeader && authTokenHeader.split(' ')[1];

        if (!authToken) {
            throw 'No token provided!';
        }

        const decodedToken = jwt.verify(authToken, SecretJWT);

        const UserCache = await RedisClient.get(`user-${decodedToken.user.id}`);

        if (UserCache) {
            const response = JSON.parse(UserCache);
            return res.status(200).json({
                message: 'Fetching User from catch successfully!',
                body: response
            });
        }

        const response = await prisma.users.findMany({
            where: {
                id: Number(decodedToken.user.id)
            }
        });

        if (!response) {
            throw 'User not found!';
        }

        const userToString = JSON.stringify(response);
        await RedisClient.set(`user-${decodedToken.user.id}`, userToString);

        return res.status(200).json({
            message: 'Fetching User successfully!',
            body: response
        });
    } catch (error) {
        return res.status(500).json({
            message: 'fetchUser Error',
            error: error
        })
    }
});

router.get('/fecthUsers', async (req, res) => {
    try {
        const response = await prisma.users.findMany();

        return res.status(200).json({
            message: 'Fetching Users successfully!',
            body: response
        });
    } catch (error) {
        return res.status(500).json({
            message: 'fecthUsers Error',
            error: error
        });
    }
});

router.put('/editUser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, name, passoword, email, userZone, userBranch, userRole } = req.body;
        const hashPassword = await bcrypt.hashSync(passoword, 10);

        const updateUser = await prisma.users.update({
            where: {
                id: Number(id),
            },
            data: {
                username: username,
                name: name,
                password: hashPassword,
                passwordToken: passoword,
                email: email,
                user_zone: userZone,
                user_branch: userBranch,
                user_role: userRole,
            }
        });

        if (!updateUser) {
            throw 'User not found!';
        }

        return res.status(200).json({
            message: 'Edit User successfully!',
            body: updateUser
        });
    } catch (error) {
        return res.status(500).json({
            message: 'editUser Error',
            error: error
        });
    }
});

router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deleteUser = await prisma.users.delete({
            where:{
                id: Number(id),
            }
        });

        if (!deleteUser) {
            throw 'User not found!';
        }

        return res.status(200).json({
            message: 'Delete User successfully!',
            body: deleteUser
        });
    } catch (error) {
        return res.status(500).json({
            message: 'deleteUser Error',
            error: error
        });
    }
});

router.post('/createRole', async (req, res) => {
    try {
        const { name_th, name_eng } = req.body;

        await prisma.roles.create({
            data: {
                name_th: name_th,
                name_eng: name_eng,
            }
        });

        await RedisClient.del('roles');

        const response = await prisma.roles.findMany();

        return res.status(201).json({
            message: "Create role success",
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Create role faild",
            error: error,
        });
    }
});

router.get('/fecthRoles', async (req, res) => {
    try {
        const roleCache = await RedisClient.get('roles');

        if (roleCache) {
            const response = JSON.parse(roleCache);
            return res.status(200).json({
                message: 'Fetching Roles from catch successfully!',
                body: response
            });
        }

        const response = await prisma.roles.findMany();
        
        const rolesTostring = JSON.stringify(response);
        await RedisClient.set("roles", rolesTostring);

        return res.status(200).json({
            message: 'Fetching Roles successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'fecthRoles Error',
            error: error
        });
    }
});

router.get('/fecthRole/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await prisma.roles.findFirst({
            where: {
                id: Number(id),
            }
        });

        if (!response) {
            throw 'Role not found!';
        }

        return res.status(200).json({
            message: 'Fetching Role successfully!',
            body: response,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'fecthRole faild',
            error: error
        });
    }
});

router.put('/updateRole/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name_th, name_eng } = req.body;

        await prisma.roles.update({
            where: {
                id: Number(id),
            },
            data: {
                name_th: name_th,
                name_eng: name_eng,
            }
        });

        await RedisClient.del('roles');
        const response = await prisma.roles.findMany();

        return res.status(200).json({
            message: "Update role success",
            body: response,
        });
    } catch (error) {
        res.status(500).json({
            message: 'updateRole faild',
            error: error
        });
    }
});

router.delete('/deleteRole/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const response = await prisma.roles.delete({
            where: {
                id: Number(id),
            }
        });

        await RedisClient.del('roles');
       
        return res.status(200).json({
            message: "Delete role success",
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Delete role faild',
            error: error
        });
    }
});

module.exports = router;