const express = require('express');
const asyncHandler = require('express-async-handler');
const { Photo, User, Comment } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res, next) => {
    // const  { photoId } = req.params

    const {
        content,
        photoId,
        userId
    } = req.body

    const comment = await Comment.create({
        content,
        photoId,
        userId
    })
    console.log(comment)
    await comment.save()

    res.json({ comment })
}));

router.get('/:photoId', asyncHandler(async(req, res, next) => {
    const { photoId } = req.params;
    const comments = await Comment.findAll({ where: {photoId: photoId}, include: User, order: [['id', 'DESC']] });
    res.json({ comments });
}));

router.get('/amount/:photoId', asyncHandler(async (req, res, next) => {
    const { photoId } = req.params;
    const comments = await Comment.findAndCountAll({ where: { photoId: photoId } });
    const total = comments.count
    res.json({ total });
}));

module.exports = router;