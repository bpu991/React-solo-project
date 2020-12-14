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
    const comments = await Comment.findAll({ where:{ photoId: photoId } });
    // console.log(comments)
    res.json({ comments });
}))

module.exports = router;