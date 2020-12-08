const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { User } = require("../../db/models");
const { handleValidationErrors } = require('../util/validation');
const { restoreUser, generateToken, AuthenticationError } = require('../util/auth');
const { jwtConfig: {expiresIn }} = require('../../config');
const bcrypt = require('bcryptjs'); 
const router = express.Router();

const validateLogin = [
    check('username').exists(),
    check('password').exists(),
];

// const email =
//     check('email')
//         .isEmail()
//         .withMessage('Please provide a valid email address')
//         .normalizeEmail();

// const password =
//     check('password')
//         .not().isEmpty()
//         .withMessage('Please provide a password');

router.get('/', restoreUser, asyncHandler(async (req, res, next) => {
    if(req.user) {
        return res.json({
            user: req.user
        })
    }
    next(new AuthenticationError());
}))

router.post('/signup', asyncHandler(async (req, res, next) => {

    const {
        firstName,
        lastName,
        userName,
        email,
        password
    } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const user = await User.create({
        firstName,
        lastName,
        username: userName,
        email,
        hashedPassword
    });
 
    const { jti, token } = generateToken(user);

    user.tokenId = jti;

    await user.save();
    
    res.cookie("token", token);
   
    res.json({ token, user: user.toSafeObject() });
}));

router.put('/login', asyncHandler(async (req, res, next) => {
    const user = await User.login(req.body);
    if (user) {
        const token = generateToken(user);
        res.cookie('token', token)
        return res.json({
            user,
        })
    }
    const err = new Error('Invalid Credentials');
    err.status = 422;
    return next(err);
    
    }) 
)



module.exports = router


