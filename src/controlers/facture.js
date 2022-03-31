const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const include = {
    lignes : {
        select: {
            id: true,
            product: true,
            quantity: true,
            price: true
        }
    },
    client: {
        select: {
            id: true,
            name: true,
            surname: true,
            mail: true,
            type: true
        }
    }
}

class FactureController {

    index(req, res) {
        prisma.facture.findMany({ include })
            .then(facts => res.json(facts))
            .catch(err => res.status(500).json({ error: true, message: err }));
    }

    async create(req, res) {
        const params = req.body;

        if(params.id !== undefined) {
            delete params.id;
        }

        if(Array.isArray(params?.lignes)) {
            const lignes = params.lignes.map(l => {
                delete l?.id;
                return l;
            });

            params.lignes = { create: lignes }
        }
        else delete params?.lignes;

        console.log(params, params.lignes);

        prisma.facture.create({
            data: params,
            include
        })
            .then(async fact => {

                if(fact.client.type === 3) {
                    await prisma.user.update({
                        where: { id: params.clientId },
                        data: {
                            type: 2
                        }
                    });

                    // Update for response
                    fact.client.type = 2;
                }


                res.status(201).json(fact);
            })
            .catch(err => res.status(500).json(err))

    }

    show(req, res) {
        const id = req.params.id;

        prisma.facture.findUnique({
            where: { id },
            include
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
