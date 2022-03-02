const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class UserController {
    
    index(req, res) {
        prisma.user.findMany({})
            .then(users => res.json(users))
            .catch(err => res.status(500).json({ error: true, message: err }));
    }

    create(req, res) {
        const params = req.body;

        if(!params) {
            return res.status(400).json({ error: true, message: "Please give an request body" });
        }

        if(!(params.mail)) {
            return res.status(400).json({ error: true, message: 'Please provide an email' });
        }

        if(params.id !== undefined) {
            delete params.id;
        }

        prisma.user.create({
            data: params
        })
            .then(user => res.status(201).json(user))
            .catch(err => res.status(500).json(err))

    }

    show(req, res) {
        // const token = req.user;

        prisma.user.findUnique({
            where: { id: req.params.id }
        })
            .then(user => res.status(201).json(user))
            .catch(err => res.status(500).json(err))
    }

    async delete(req, res) {
        // const user = req.user;
        // if(user.type > 2 || user.user_id != req.params.id) {
        //     return res.status(403).json({ error: true, message: "Forbiden" });
        // }

        prisma.user.delete({
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

        prisma.user.update({
            where: { id },
            data: params
        })
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json({ error: true, message, err }))
    }
}

module.exports = UserController;