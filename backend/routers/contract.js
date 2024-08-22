const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/addContact', async (req, res) => {
    try {
        const { 
            // Cus req
            CusNoCk, PrefixName, firstNameTH, lastNameTH, firstNameEN, lastNameEN,
            CardId, Phone_Cus, Line_Cus, Facebook_Cus, address, province, amphur,
            district, zipcode, 
            // contact req
            ContNo, CodeLoan, NameLoan, UserZone, UserBranch,
            //locker req
            lockerNo, floorNo,
         } = req.body;
        let newCus;

        const reCheckCus = await prisma.dataCus.findFirst({
            where: {
                CardId: CusNoCk,
            }
        });

        const reCheckCont = await prisma.cotractsLocker.findFirst({
            where: {
                CONTNO: ContNo,
            }
        });

        const reCheckLocker = await prisma.lockers.findFirst({
            where: {
                id: lockerNo,
            },
            include: {
               Lockerfloor: {
                    where: {
                        FloorNo: floorNo,
                        LocFloorActive: 'yes',
                    }
               },
            }
        });        

        if (reCheckLocker !== null) {
            throw 'Contract allready have contract to this locker!';
        }

        if (reCheckCus === null) {
            newCus = await prisma.dataCus.create({
                data: {
                    PrefixName:     PrefixName,
                    fristName_TH:   firstNameTH,
                    lastName_TH:    lastNameTH,
                    fristName_EN:   firstNameEN,
                    lastName_EN:    lastNameEN,
                    address:        address,
                    province:       province,
                    amphur:         amphur,
                    district:       district,
                    zipcode:        zipcode,
                    CardId:         CardId,
                    CusIdCk:        Number(CusNoCk),
                    Phone_Cus:      Phone_Cus,
                    Line_Cus:       Line_Cus,
                    Facebook_Cus:   Facebook_Cus,
                }
            });
        }

        if (reCheckCont === null) {
            const newCont = await prisma.cotractsLocker.create({
                data: {
                    CUSNO:      Number(newCus.id),
                    CONTNO:     ContNo,
                    CodeLoan:   Number(CodeLoan),
                    NameLoan:   NameLoan,
                    UserZone:   UserZone,
                    UserBranch: UserBranch,
                }
            });
        }

        if (reCheckLocker.Lockerfloor !== null) {
            const newContToLocker = await prisma.lockerContracts.create({
                data: {
                    CONTNO: ContNo,
                    LocFloorId: floorNo,
                }
            });

            return res.status(201).json({
                message: 'Add contract to locker successfully!',
                body: newContToLocker,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Add contract to locker faild',
            error: error,
        });
    }
});

router.get('/contracts/:contno/:typeloan', async (req, res) => {
    try {
        const { contno, typeloan } = req.params;

        const response = await prisma.$queryRaw`
            select "LockerContracts"."CONTNO", "LockerFloors"."FloorNo", "CotractsLocker"."CUSNO", "DataCus"."PrefixName", concat("DataCus"."fristName_TH",' ', "DataCus"."lastName_TH") as cusNameTH,
                    concat("DataCus"."fristName_EN",' ', "DataCus"."lastName_EN") as cusNameEN, "DataCus"."CardId", "DataCus"."Phone_Cus", "Lockers"."LockerName" 
            from (((("LockerContracts" inner join "CotractsLocker" on "LockerContracts"."CONTNO" = "CotractsLocker"."CONTNO") 
                    inner join "LockerFloors" on "LockerContracts"."LocFloorId" = "LockerFloors".id)
                    inner join "Lockers" on  "LockerFloors"."LockerNo" = "Lockers".id)
                    inner join "DataCus" on "CotractsLocker"."CUSNO" = "DataCus".id)
            where "LockerContracts"."CONTNO" = ${contno} and "LockerFloors"."LocFloorActive" = 'yes' and "CotractsLocker"."NameLoan" = ${typeloan}
        `;
        
        if (response === null) {
            throw 'Contract not found!';
        }

        return res.status(200).json({
            message: 'Get contracts successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Get contracts faild',
            error: error,
        })
    }
});

router.get('/contracts/:contno', async (req, res) => {
    try {
        const { contno } = req.params;

        const response = await prisma.$queryRaw`
            select "LockerContracts"."CONTNO", "LockerFloors"."FloorNo", "CotractsLocker"."CUSNO", "DataCus"."PrefixName", concat("DataCus"."fristName_TH",' ', "DataCus"."lastName_TH") as cusNameTH,
                    concat("DataCus"."fristName_EN",' ', "DataCus"."lastName_EN") as cusNameEN, "DataCus"."CardId", "DataCus"."Phone_Cus", "Lockers"."LockerName" , "NameLoan"
            from (((("LockerContracts" inner join "CotractsLocker" on "LockerContracts"."CONTNO" = "CotractsLocker"."CONTNO") 
                    inner join "LockerFloors" on "LockerContracts"."LocFloorId" = "LockerFloors".id)
                    inner join "Lockers" on "LockerFloors"."LockerNo" = "Lockers".id)
                    inner join "DataCus" on "CotractsLocker"."CUSNO" = "DataCus".id)
            where "LockerContracts"."CONTNO" = ${contno} and "LockerFloors"."LocFloorActive" = 'yes'
        `;
        
        if (response === null) {
            throw 'Contract not found!';
        }

        return res.status(200).json({
            message: 'Get contracts successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Get contracts faild',
            error: error,
        })
    }
});

module.exports = router;