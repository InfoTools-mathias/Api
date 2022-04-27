const { verify, sign } = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// base64 "ServerOauthV1:BtI0tDKEP3BOH9tA7BohXGXSzKC7Kvz00LZ2p6PZwqxXGKwjMO9W7SRM4bMbGfkQ"
const SECRET_KEY = "U2VydmVyT2F1dGhWMTpCdEkwdERLRVAzQk9IOXRBN0JvaFhHWFN6S0M3S3Z6MDBMWjJwNlBad3F4WEdLd2pNTzlXN1NSTTRiTWJHZmtR";

async function middelware(req, res, next) {
    const token = String(req.headers['authorization']).split(' ');
    if(token.length === 0 || token[0] !== "Bearer") {
        return res.status(403).json({ error: true, message: "A token is required" });
    }

    try {
        const decoded = verify(token[1], SECRET_KEY);
        req.user = decoded;
    }
    catch(err) {
        return res.status(401).json({ error: true, message: "Invalid token" });
    }

    return next();
}

async function login(req, res) {
    const token = String(req.headers['authorization']).split(' ');
    if(token.length === 0 || token[0] !== "Basic") {
        return res.status(400).json({ error: true, message: 'Please provide credential' });
    }
    const data = atob(token[1]).split(':');

    const user = await prisma.user.findUnique({
        where: { mail: data[0] }
    });

    if(user.type > 1) {
        return res.status(401).json({
            error: true,
            message: 'Not Authorized'
        });
    }

    if(user && (data[1] === user.password)) {
        const token = sign({ user_id: user.id, type: user.type }, SECRET_KEY, { expiresIn: "2h", });
        const decoded = verify(token, SECRET_KEY);

        return res.status(200).json({
            user_id: decoded.user_id,
            token_type: "Bearer",
            token: token,
            created_at: decoded.iat,
            expire_at: decoded.exp
        });
    }
    return res.status(401).json({ error: true, message: "Invalid Credentials" });
}

async function getUserByToken(req, res) {
    const userId = req.user.user_id;
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            surname: true,
            mail: true,
            type: true,
            password: true,
            factures: true,
            meetings: true
        }
    });

    return res.status(200).json(user);
}

module.exports = {
    getUserByToken,
    middelware,
    login
}