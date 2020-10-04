const express = require('express');
const asyncHandler = require('express-async-handler');

const { User, Photo } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async function (req, res, next) {
    const users = await User.findAll();
    res.json({ users });
}));

router.get('/:userId', asyncHandler(async(req, res) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId, {include: Photo} );
    res.json(user.toSafeObject());
    // Handle error for no existing user
}))

module.exports = router;
