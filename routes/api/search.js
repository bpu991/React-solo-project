const express = require('express');
const asyncHandler = require('express-async-handler');
const { Photo, User, Comment } = require('../../db/models');
const { Op } = require("sequelize");

const router = express.Router();

router.get('/:searchInput', asyncHandler(async (req, res, next) =>{

    const { searchInput } = req.params;

    const results = await User.findAll({
        where: {
            username: {
                [Op.iLike]: '%' + searchInput + '%'
            } } });

    res.json({ results });

}));

module.exports = router;