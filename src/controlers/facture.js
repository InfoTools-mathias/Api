const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const include = {
    id: true,
    date: true,
    lignes : {
        select: {
            id: true,
            product: true,
            quantity: true,
            price: true
        }
    }
}

class FactureController {

    index(req, res) {
        prisma.facture.findMany({ include })
            .then(facts => res.json(facts))
            .catch(err => res.status(500).json({ error: true, message: err }));
    }

    create(req, res) {
        const params = req.body;

        if(params.id !== undefined) {
            delete params.id;
        }

        prisma.facture.create({
            data: params
        })
            .then(fact => res.status(201).json(fact))
            .catch(err => res.status(500).json(err))
    }

    show(req, res) {
        const id = req.params.id;

        prisma.facture.findUnique({
            where: { id },
            select
        })
            .then(fact => res.status(200).json(fact))
            .catch(() => res.status(500).json({ error: true, message: `An error was occured` }))
    }

    async delete(req, res) {
        // const user = req.user;
        // if(user.type > 2 || user.user_id != req.params.id) {
        //     return res.status(403).json({ error: true, message: "Forbiden" });
        // }

        prisma.facture.delete({
            where: { id: req.params.id }
        })
            .then(() => res.status(204))
            .catch(err => res.status(500).json(err))
    }

    update(req, res) {
        // const user = req.user;
        // if(user.type > 2 || user.user_id != req.params.id) {
        //     return res.status(403).json({ error: true, message: "Forbiden" });
        // }

        const id = req.params.id;
        const params = req.body;

        prisma.facture.update({
            where: { id },
            data: params,
            include
        })
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json({ error: true, message, err }))
    }

    createLigne(req, res) {
        const facture = res.params.id;
        const params = req.body;

        if(params?.id !== undefined) delete params.id;
        Object.defineProperty(params, 'factureId', { value: facture, enumerable: true, writable: true });

        prisma.ligneFacture.create({ data: params })
            .then(ligne => res.json(ligne))
            .catch(() => res.status(500).json({ error: true, message: "Server error" }))
    }

    deleteLigne(req, res) {
        const id = res.params.ligneId;
        
        prisma.ligneFacture.delete({
            where: { id }
        })
            .then(() => res.status(204))
            .catch(err => res.status(500).json(err))
    }

    editLigne(req, res) {
        res.json({ error: true, message: "Not implemented" });
    }
}

module.exports = FactureController;