const jwt = require('jsonwebtoken');

const {
    jwtConfig: { secret, expiresIn },
} = require('../../config');
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
function generateToken(user) {
    const data = user.toSafeObject();

    return jwt.sign({ data }, secret, {
        expiresIn: Number.parseInt(expiresIn)
    });
}

function restoreUser(req, _res, next) {
    const { token } = req.cookies;
    if(!token) {
        const err = new AuthenticationError();
        return next(err);
    }
}