const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const include = {
    products: {
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            quantity: true,
            image: true
        }
    }
}

class CategorieController {

    index(req, res) {
        prisma.categorie.findMany({ include })
            .then(cats => res.json(cats))
            .catch(err => res.status(500).json({ error: true, message: err }))
    }

    create(req, res) {
        // const user = req.user;
        // if(user.type > 1) {
        //     return res.status(403).json({ error: true, message: "Forbiden" });
        // }

        const params = req.body;

        if(!params) {
            return res.status(400).json({ error: true, message: "Please give an request body" });
        }

        if(params.id !== undefined) {
            delete params.id;
        }

        prisma.categorie.create({ data: params })
            .then(categorie => res.status(201).json(categorie))
            .catch(err => res.status(500).json({ error: true, message: err }));
    }

    show(req, res) {
        const id = req.params.id;

        prisma.categorie.findUnique({
            where: { id },
            include
        })
            .then(cat => res.json(cat))
            .catch(err => res.status(500).json({ error: true, message: err }))
    }

    update(req, res) {
        // const user = req.user;
        // if(user.type > 1) {
        //     return res.status(403).json({ error: true, message: "Forbiden" });
        // }

        const id = req.params.id;
        const params = req.body;

        prisma.categorie.update({
            where: { id },
            data: params
        })
            .then(() => res.status(200).json({ data: "sucess" }))
            .catch((err) => res.status(500).json({ error: true, message: err }));
    }

    async delete(req, res) {
        // const user = req.user;
        // if(user.type > 1) {
        //     return res.status(403).json({ error: true, message: "Forbiden" });
        // }
        
        prisma.categorie.delete({
            where: { id: req.params.id }
        })
            .then(() => res.status(204))
            .catch(err => res.status(404).json({ message: err }))
    }
}

module.exports = CategorieController;