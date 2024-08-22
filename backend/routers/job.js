const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const cron = require('node-cron');
const redisClient = require('../config/redis');

const prisma = new PrismaClient();

cron.schedule('0 0 23 * * *', async () => {
    try {
        const response = await axios.get(`http://192.168.8.85:8000/api/locker/getBranch`);

        if (response.status !== 200) {
            throw "callback function failed";
        }

        const branchs = response.data.body;

        const insertBranch = await prisma.tBBranch.createMany({
            data: branchs.map((branch) => ({
                idContract: branch.id_Contract,
                NameBranch: branch.Name_Branch,
                NickNameBranch: branch.NickName_Branch,
                Zone: branch.Zone_Branch,
                BranchActive: branch.Branch_Active === null ? 'yes' : branch.Branch_Active,
                Province: branch.province_Branch,
                BranchName: branch.branch_name,
                Lat: branch.lat,
                Lon: branch.lon,
                PhoneNo: branch.phoneNo,
                LineId: branch.line_id,
            })),
        });

        redisClient.del('zone');

        return console.log('branchs inserted successfully : ', insertBranch);
    } catch (error) {
        return console.log('cron job faild : ', error);
    }
});

module.exports = router, cron;
