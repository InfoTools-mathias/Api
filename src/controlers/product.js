const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const { parseProduct, writeProductImage } = require('../../functions/utilsV1');

const include = {
    categories: {
        select: {
            id: true,
            name: true
        }
    }
}

class ProductController {
    
    index(req, res) {
        prisma.product.findMany({ include })
            .then(products => res.json(products))
            .catch(err => res.status(500).json({ error: true, message: err }))
    }

    create(req, res) {
        const params = req.body;

        if(!params) {
            return res.status(400).json({ error: true, message: "Please give an request body" });
        }

        if(params.id !== undefined) {
            delete params.id;
        }

        if(params.categories !== undefined) {
            if(Array.isArray(params.categories)) {
                params.categories.map(c => {
                    return { id: c };
                })
            }
            else delete params.categories;
        }
        else delete params.categories;
        

        // if(params.image !== undefined && req.headers['x-image-data'] !== undefined) {
        //     writeProductImage(req.headers['x-image-data'], params.image);
        // }

        prisma.product.create({
            data: params,
            include
        })
            .then(product => res.status(201).json(product))
            .catch(err => res.status(500).json({ error: true, message: err }))
    }

    show(req, res) {
        const id = req.params.id;

        prisma.product.findUnique({
            where: { id },
            include
        })
            .then(product => res.status(200).json(product))
            .catch(() => res.status(500).json({ error: true, message: `An error was occured` }))
    }

    async delete(req, res) {
        // const user = req.user;
        // if(user.type > 1) {
        //     return res.status(403).json({ error: true, message: "Forbiden" });
        // }

        prisma.product.delete({
            where: {
                id: req.params.id
            }
        })
            .then(() => res.status(204))
            .catch(err => res.status(404).json({ error: true, message: err }))
    }

    update(req, res) {
        const id = req.params.id;
        const params = req.body;

        // if(params.image !== undefined && req.headers['x-image-data'] !== undefined) {
        //     writeProductImage(req.headers['x-image-data'], params.image);
        // }

        if(params.categories !== undefined) {
            if(Array.isArray(params.categories)) {
                params.categories.map(c => {
                    return { id: c };
                })
            }
            else delete params.categories;
        }
        else delete params.categories;

        prisma.product.update({
            where: { id },
            data: params
        })
            .then(product => res.status(200).json(product))
            .catch((err) => res.status(500).json({ error: true, message: err }));
    }
}

module.exports = ProductController;