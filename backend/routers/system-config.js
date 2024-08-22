const express = require('express');
const router = express.Router();
const { PrismaClient, active } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/colors', async (req, res) => {
    try {
        const { nameTH, nameENG } = req.body;

        const response = await prisma.colors.create({
            data: {
                name_th: nameTH,
                name_eng: nameENG,
                Actives: 'yes',
            },
        });
        
        return res.status(201).json({
            message: 'Color created successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating color',
            error: error,
        });
    }
});

router.get('/colors', async (req, res) => {
    try {
        const response = await prisma.colors.findMany({
            where: {
                Actives: "yes",
            },
        });

        return res.status(200).json({
            message: 'Fetching colors successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching colors',
            error: error,
        });
    }
});

router.get('/colors/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await prisma.colors.findFirst({
            where: {
                id: Number(id),
                Actives: "yes",
            },
        });

        if (!response) {
            return res.status(404).json({
                message: 'Color not found!',
            });
        }

        return res.status(200).json({
            message: 'Fetching color successfully!',
            body: response,
        });
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching color',
        error: error,
      });
    } 
});

router.put('/colors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nameTH, nameENG, Actives } = req.body;

        const response = await prisma.colors.update({
            where: {
                id: Number(id),
            },
            data: {
                name_th: nameTH,
                name_eng: nameENG,
                Actives: Actives,
            },
        });

        return res.status(200).json({
            message: 'Color updated successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating color',
            error: error,
        });
    }
});

router.delete('/colors/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await prisma.colors.delete({
            where: {
                id: Number(id),
            },
        });

        return res.status(200).json({
            message: 'Color deleted successfully!',
            body: response,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error deleting color',
            error: err,
        });
    }
});

router.post('/typetakedoc', async (req, res) => {
    try {
        const { nameTH, nameENG, ZoneActive } = req.body;

        const response = await prisma.tBTypeTakeDoc.create({
            data: {
                name_th: nameTH,
                name_eng: nameENG,
                ZoneActive: JSON.stringify(ZoneActive),
            }
        });

        return res.status(201).json({
            message: 'Typetakedoc created successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating typetakedoc',
            error: error,
        });
    }
});

router.get('/typetakedoc', async (req, res) => {
    try {
        const response = await prisma.tBTypeTakeDoc.findMany({});

        return res.status(200).json({
            message: 'Fetching typetakedocs successfully!',
            body: response,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching typetakedoc',
            error: error,
        });
    }
});

router.get('/typetakedoc/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await prisma.tBTypeTakeDoc.findFirst({ 
            where: {
                id: Number(id),
            }
        });

        return res.status(200).json({
            message: 'Fetching typetakedoc successfully',
            body: response,
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error fetching typetakedoc',
            error: error,
        });
    }
});

router.put('/typetakedoc/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nameTH, nameENG, ZoneActive } = req.body;

        const response = await prisma.tBTypeTakeDoc.update({
            where: {
                id: Number(id),
            },
            data: {
                name_th: nameTH,
                name_eng: nameENG,
                ZoneActive: JSON.stringify(ZoneActive),
            }
        });

        return res.status(200).json({
            message: 'Type document updated successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Error updating typetakedoc',
            error: error,
        });
    }
});

router.delete('/typetakedoc/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await prisma.tBTypeTakeDoc.delete({
            where: {
                id: Number(id),
            }
        });

        return res.status(200).json({
            message: 'Delete type document successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Delete type document faild',
            error: error,
        });
    }
});

router.post('/producttype', async (req, res) => {
    try {
        const { nameTH, nameENG, ZoneActive } = req.body;
    
        const response = await prisma.producttypes.create({
            data : {
                Name_TH: nameTH,
                Name_EN: nameENG,
                ZoneActive: JSON.stringify(ZoneActive),
            }
        });

        return res.status(201).json({
            message: 'Product type created successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'creating product type faild',
            error: error,
        })
    }
});

router.get('/producttype', async (req, res) => {
    try {
        const response = await prisma.producttypes.findMany({});

        return res.status(200).json({
            message: 'Fetching product types successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'fetching product type faild',
            body: error,
        });
    }
});

router.get('/producttype/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await prisma.producttypes.findFirst({
            where: {
                id: Number(id),
            }
        });

        if(response === null) throw "Product type not found!";

        return res.status(200).json({
            message: 'Fetching product type successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'fetching product type faild',
            error: error,
        });
    }
});

router.put('/producttype/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nameTH, nameENG, ZoneActive } = req.body;

        const response = await prisma.producttypes.update({
            where: {
                id: Number(id),
            },
            data: {
                Name_TH: nameTH,
                Name_EN: nameENG,
                ZoneActive: JSON.stringify(ZoneActive),
            }
        });

        return res.status(200).json({
            message: 'Product type updated successfully!',
            body: response,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Updating product type faild",
            error: error,
        });
    }
});

router.delete('/producttype/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await prisma.producttypes.delete({
            where: {
                id: Number(id),
            }
        });

        return res.status(200).json({
            message: 'Product type deleted successfully!',
            body: response,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Deleting product type faild",
            error: error,
        });
    }
}); 

module.exports = router;