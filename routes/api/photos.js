const express = require('express');
const asyncHandler = require('express-async-handler');
const { Photo, User, Comment } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res, next) => {
    // const { userId } = req.params;
    const photos = await Photo.findAll();
    // Handle error for no existing user
    res.json({ photos });
}))

router.get('/:photoId', asyncHandler(async function (req, res, next) {
    const { photoId } = req.params;
    const photo = await Photo.findByPk(photoId, { include: User });
    res.json({photo})
}));



module.exports = router;