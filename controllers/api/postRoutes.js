const router = require("express").Router();
// const req = require('express/lib/request');
// const sequelize = require('../config/connection');
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', withAuth, (req, res)=>{
    const post = req.body
    const newPost = Post.create({...post, userId: req.session.userId})
    console.log(`Your new post ${newPost}`)
    .then((newPost)=> res.json(newPost))
    .catch((err)=> res.status(500).json(err))
});

router.get('/:id', (req, res) => {

    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: 
            ['id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/', (req, res) => {
   
    Post.findAll({
            attributes: 
            ['id',
                'title',
                'content',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPostData => res.json(dbPostData.reverse()))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});






module.exports = router;
