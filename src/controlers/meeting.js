const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const include = {
    users: {
        select: {
            id: true,
            name: true,
            surname: true,
            mail: true,
            type: true
        }
    }
}

class MeetingController {
    
    async index(req, res) {

        prisma.meeting.findMany({ include })
            .then(meetings => res.json(meetings))
            .catch(err => res.status(500).json({ error: true, message: err }))
    }

    create(req, res) {
        const params = req.body;

        if(!params) {
            return res.status(400).json({ error: true, message: "Please give an request body" });
        }

        prisma.meeting.create({
            data: params,
        })
            .then(meeting => res.status(201).json(meeting))
            .catch(err => res.status(500).json({ error: true, message: err }))
    }

    show(req, res) {
        const id = req.params.id;

        prisma.meeting.findUnique({
            where: { id },
            include
        })
            .then(meeting => res.status(200).json(meeting))
            .catch(() => res.status(500).json({ error: true, message: `An error was occured` }))
    }

    async delete(req, res) {
        // const user = req.user;
        // if(user.type > 2 || user.user_id != req.params.id) {
        //     return res.status(403).json({ error: true, message: "Forbiden" });
        // }

        prisma.meeting.delete({
            where: { id: req.params.id }
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

        prisma.meeting.update({
            where: { id },
            data: params
        })
            .then(meeting => res.status(200).json(meeting))
            .catch(err => res.status(500).json({ error: true, message: err }));
    }
}

module.exports = MeetingController;