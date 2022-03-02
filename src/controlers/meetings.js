// const Meeting = require('../../models/v1/meetings');
// const User = require("../../models/v1/user");

// class MeetingController {
    
//     async index(req, res) {
//         let meetings = null;
//         if(req.user.type < 2) {
//             meetings = await Meeting.findAll();
//         }
//         else {
//             meetings = await Meeting.findAll({
//                 where: {
//                     [Op.or]: [
//                         { request_user: req.user.user_id },
//                         { target_user: req.user.user_id },
//                     ]
//                 }
//             })
//         }

//         if(meetings === null) return res.json([]);

//         for(const m of meetings) {
//             m.request_user = User.findByPk(m.request_user)
//             if(m.request_user != null) delete m.request_user.password;

//             m.target_user = User.findByPk(m.target_user)
//             if(m.target_user != null) delete m.target_user.password;
//         }

//         res.json(meetings);
//     }

//     create(req, res) {
//         const params = req.body;

//         if(!params) {
//             return res.status(400).json({ error: true, message: "Please give an request body" });
//         }

//         Meeting.create(params)
//         .then(meeting => res.status(201).json(meeting))
//         .catch(err => res.status(500).json({ error: true, message : err }))
//     }

//     show(req, res) {

//         if(req.user.type < 2) return res.status(403).json({ error: true, message: "You are Unauthorized"})


//         Meeting.findByPk(req.params.id)
//         .then(async meetings => {
//             if(meetings === null) return res.json([]);

//             for(const m of meetings) {
//                 m.request_user = User.findByPk(m.request_user)
//                 if(m.request_user != null) delete m.request_user.password;

//                 m.target_user = User.findByPk(m.target_user)
//                 if(m.target_user != null) delete m.target_user.password;
//             }
//             res.json(meetings);
//         })
//         .catch(err => res.status(500).json({ error: true, message: err }))
//     }

//     async delete(req, res) {
//         const user = req.user;
//         if(user.type > 2 || user.user_id != req.params.id) {
//             return res.status(403).json({ error: true, message: "Forbiden" });
//         }

//         const delUser = await User.findByPk(parseInt(req.params.id));
//         if(delUser !== null) {
//             await delUser.destroy();
//             return res.status(204);
//         }
//         res.status(404);
//     }

//     update(req, res) {
//         const user = req.user;
//         if(user.type > 2 || user.user_id != req.params.id) {
//             return res.status(403).json({ error: true, message: "Forbiden" });
//         }

//         const id = req.params.id;
//         const params = req.body;
//         const update = {
//             where: { id: id },
//             limit: 1
//         }

//         User.update(params, update)
//         .then(user => {
//             const data = JSON.parse(JSON.stringify(user));
//             delete data.password;

//             res.status(201).json(data);
//         })
//     }
// }

// module.exports = MeetingController;