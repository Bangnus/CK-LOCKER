const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const redisClient = require('../config/redis');
const paginate = require('express-paginate');

const prisma = new PrismaClient();



router.get('/zone', async (req, res) => {
    try {
        const branches = await redisClient.get('zone');

        if (branches) {
            const response = JSON.parse(branches);
            return res.status(200).json({
                message: 'Fetching branch from cache successfully!',
                body: response
            });
        }

        const response = await prisma.$queryRaw`
            select "Zone",
            case
                when "Zone" = 10 then 'PNHQ - ปัตตานี'
                when "Zone" = 20 then 'HTHQ - หาดใหญ่'
                when "Zone" = 30 then 'HTHQ01 - นครศรีธรรมราช'
                when "Zone" = 40 then 'KBHQ - กระบี่'
                when "Zone" = 50 then 'CKT - สุราษฎร์ธานี'
            end as ZoneName
            from "TBBranch" GROUP by "Zone" order by "Zone" asc 
        `;

        const zoneToString = JSON.stringify(response);
        await redisClient.set('zone', zoneToString);

        return res.status(200).json({
            message: "fecth branch successfully",
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'get branch faild',
            error: error
        });
    }
});

router.get('/branchs', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const [results, itemCount] = await Promise.all([
            prisma.tBBranch.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    id: 'desc',
                }
            }),
            prisma.tBBranch.count(),
        ]);

        const totalPages = Math.ceil(itemCount / limit);

        return res.status(200).json({
            message: "fecth branch successfully",
            has_more: paginate.hasNextPages(req)(totalPages),
            body: results, totalPages, itemCount,
            currentPage: page,
            pages: paginate.getArrayPages(req)(totalPages , totalPages, page),
        });
    } catch (error) {
        return res.status(500).json({
            message: 'get branch faild',
            error: error
        });
    }
});

router.get('/branch/:zone', async (req, res) => {
    try {
        const { zone } = req.params;        

        const response = await prisma.tBBranch.findMany({
            where: {
                Zone: Number(zone),
            }
        });

        if (response.length === 0) {
            throw "branch not found!";
        }

        return res.status(200).json({
            message: "fecth branch successfully",
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'fecing branch faild',
            error: error
        });
    }
});

module.exports = router;
