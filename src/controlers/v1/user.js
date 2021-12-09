const User = require("../../models/v1/user");

class UserController {
    
    index(req, res) {
        User.findAll()
        .then(async users => {
            const data = JSON.parse(JSON.stringify(users));
            let final = [];
            for(let user of data) {
                if(req.user.type > 1 || req.user.user_id != user.id) delete user.password;
                final.push(user);
            }
            return res.json(final);
        })
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

        User.findOne({ where: { mail: params.mail } })
        .then(async (user) => {
            if(user === null) {

                if(params.id !== undefined) {
                    delete params.id;
                }
    
                User.create(params)
                .then(user => res.status(201).json(user))
                .catch(err => res.status(500).json(err))
            }
            else {
                res.status(409).json({ error: true, message: 'User already exist' });
            }
        })
        .catch((err) => {
            res.status(500).json(err)
        })

    }

    show(req, res) {
        const user = req.user;

        const ids = String(req.params.ids).split(',');
        if(ids.length === 1) {
            User.findByPk(ids[0])
            .then(user => {
                const data = JSON.parse(JSON.stringify(user));
                if(user.type > 1 || user.user_id != ids[0]) delete data.password;
                return res.json(data);
            })
        }

        User.findAll()
        .then(async users => {
            const data = JSON.parse(JSON.stringify(users));
            let final = [];
            for(const thisUser of data) {
                if(ids.includes(String(thisUser.id))) {
                    if(user.type > 1 || user.user_id != thisUser.id) delete thisUser.password;
                    final.push(thisUser);
                }
                else {
                    final.push({
                        id: id,
                        error: 'User not found'
                    })
                }
            }
            return res.json(final);
        })
        .catch(err => res.status(500).json({ error: true, message: err }))
    }

    async delete(req, res) {
        const user = req.user;
        if(user.type > 2 || user.user_id != req.params.id) {
            return res.status(403).json({ error: true, message: "Forbiden" });
        }

        const delUser = await User.findByPk(parseInt(req.params.id));
        if(delUser !== null) {
            await delUser.destroy();
            return res.status(204);
        }
        res.status(404);
    }

    update(req, res) {
        const user = req.user;
        if(user.type > 2 || user.user_id != req.params.id) {
            return res.status(403).json({ error: true, message: "Forbiden" });
        }

        const id = req.params.id;
        const params = req.body;
        const update = {
            where: { id: id },
            limit: 1
        }

        User.update(params, update)
        .then(user => {
            const data = JSON.parse(JSON.stringify(user));
            delete data.password;

            res.status(201).json(data);
        })
    }
}

module.exports = UserController;