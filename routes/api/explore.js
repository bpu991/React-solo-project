const express = require('express');
const asyncHandler = require('express-async-handler');
const { Photo, User } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
    // const { userId } = req.params;
    const photos = await Photo.findAll();
    // Handle error for no existing user
    res.json({ photos });
}))

// router.get('/', asyncHandler(async function (req, res, next) {
//     const users = await User.findAll();
//     res.json({ users });
// }));

module.exports = router;