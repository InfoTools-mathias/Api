// const Categorie = require('../../models/v1/categorie');
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
        const user = req.user;
        if(user.type > 1) {
            return res.status(403).json({ error: true, message: "Forbiden" });
        }

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
        
        // Categorie.create(req.body)
        // .then(categorie => res.status(201).json(categorie))
        // .catch(err => res.status(500).json({ error: true, message: err }));
    }

    show(req, res) {
        const id = req.params.id;
        // const ids = id.toString(2).split("").map(b => parseInt(b)).reverse();

        prisma.categorie.findUnique({
            where: { id },
            include
        })
            .then(cat => res.json(cat))
            .catch(err => res.status(500).json({ error: true, message: err }))

        // let index = 1;
        // let result = [];

        // Categorie.findAll()
        // .then(categories => {
        //     const data = JSON.parse(JSON.stringify(categories));

        //     for(const bit of ids) {
        //         if(bit === 1) {
        //             const cat = data.find(c => c.id == index);
        //             result.push(cat);
        //         }
        //         index += index;
        //     }
        //     res.json(result)
        // })
        // .catch(err => res.status(500).json({ error: true, message: err }));
    }

    update(req, res) {
        const user = req.user;
        if(user.type > 1) {
            return res.status(403).json({ error: true, message: "Forbiden" });
        }

        // const categorieId = req.params.id;
        const params = req.body;

        // const update = {
        //     where: { id: categorieId },
        //     limit: 1
        // };

        prisma.categorie.update({
            where: { id },
            data: params
        })
            .then(() => res.status(200).json({ data: "sucess" }))
            .catch((err) => res.status(500).json({ error: true, message: err }));

        // Categorie.update(params, update)
        //     .then(() => res.status(200).json({ data: "sucess" }))
        //     .catch((err) => res.status(500).json({ error: true, message: err }));

    }

    async delete(req, res) {
        const user = req.user;
        if(user.type > 1) {
            return res.status(403).json({ error: true, message: "Forbiden" });
        }
        
        prisma.categorie.delete({
            where: { id: req.params.id }
        })
            .then(() => res.status(204))
            .catch(err => res.status(404).json({ message: err }))
        // const delCategorie = await Categorie.findByPk(parseInt(req.params.id));
        // if(delCategorie !== null) {
        //     await delCategorie.destroy();
        //     return res.status(204);
        // }
        // res.status(404);
    }

}

module.exports = CategorieController;