const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/takedocument', async (req, res) => {
    try {
        const { contNo, typeTakedocId, typeLoan, Note, Locker, Floor, UserZone, Branch, UserTake } = req.body;
        const date = new Date();

        const takedocument = await prisma.tBTakeDoc.create({
            data: {
                CONTNO: contNo,
                TakeType: Number(typeTakedocId),
                TypeLoans: typeLoan,
                Note: Note,
                LockerId: Number(Locker),
                LockerFloorId: Number(Floor),
                ReqTakeDT: date,
                UserZone: Number(UserZone),
                Branch: Number(Branch),
                PersonTake: Number(UserTake),
            }
        });

        return res.status(201).json({
            message: "Create takedocument successfully",
            body: takedocument,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'takedocument faild',
            error: error,
        });
    }
});

router.post('/takedocument/:contNo', async (req, res) => {
    try {
        const { contNo } = req.params;
        const { NameLoan } = req.body;

        const response = await prisma.$queryRaw`
            select "LockerName", "FloorNo", "CotractsLocker"."CONTNO", "NameLoan", "LockerNo"
            from ((("Lockers" inner join "LockerFloors" on "Lockers"."id" = "LockerFloors"."LockerNo")
                inner join "LockerContracts" on "LockerFloors"."id" = "LockerContracts"."LocFloorId")
                inner join "CotractsLocker" on "LockerContracts"."CONTNO" = "CotractsLocker"."CONTNO")
            where "LockerContracts"."CONTNO" = ${contNo} and "NameLoan" = ${NameLoan} and "LockerFloors"."LocFloorActive" = 'yes'
        `;

        if (response.length === 0) throw 'Contract not found in locker!';

        return res.status(200).json({
            message: 'Fetching takedocument successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'get takedocument faild',
            error: error,
        });
    }
});

router.get('/takedocument/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const response = await prisma.tBTakeDoc.findMany({
            where: {
                PersonTake: Number(userId),
                TakeSt: null,
            }
        });

        if (response === null) throw 'document not found!';

        return res.status(200).json({
            message: 'Fetching takedocument successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'get takedocument faild',
            error: error,
        });
    }
});



module.exports = router;