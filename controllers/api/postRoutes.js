const router = require("express").Router();
// const req = require('express/lib/request');
// const sequelize = require('../config/connection');
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, (req, res)=>{
    const post = req.body
    Post.create({...post, userId: req.session.userId})
    .then((newPost)=> res.json(newPost))
    .catch((err)=> res.status(500).json(err))
})



module.exports = router;
