const jwt = require('jsonwebtoken');
const uuid = require('uuid').v4;

const {
    jwtConfig: { secret, expiresIn },
} = require('../../config/index');
const { User } = require('../../db/models');

class AuthenticationError extends Error {
    constructor() {
        super('Unauthorized');

        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, AuthenticationError);
        }

        this.name = 'AuthenticationError';
        this.status = 401;
    }
}
// function generateToken(user) {
//     const data = user.toSafeObject();
//     console.log(data);
//     return jwt.sign({ data }, secret, {
//         expiresIn: Number.parseInt(expiresIn)
//     });
// }

function generateToken(user) {
    const data = user.toSafeObject();
    const jwtid = uuid();

    return {
        jti: jwtid,
        token: jwt.sign({ data }, secret, { expiresIn: Number.parseInt(expiresIn), jwtid })
    };
}

function restoreUser(req, _res, next) {
    const { token } = req.cookies;
    if(!token) {
        const err = new AuthenticationError();
        return next(err);
    }
}

module.exports = {
    generateToken,
    restoreUser,
    AuthenticationError
}