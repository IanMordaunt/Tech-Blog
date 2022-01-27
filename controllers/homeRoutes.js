const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Post, Comment} = require('../models')


router.get('/', async (req, res)=>{
    try {
        // Get all projects and JOIN with user data
        // const postData = await Post.findAll({
           
        //     attributes: [
        //         'id',
        //         'post_body',
        //         'title'    
        //       ],
        //       include: [
        //         {
        //           model: Comment,
        //           attributes: ['id', 'comment_text', 'user_id', 'post_id'],
        //           include: {
        //             model: User,
        //             attributes: ['username']
        //           }
        //         },
        //         {
        //           model: User,
        //           attributes: ['username']
        //         }
        //       ]
        //     })
        
        //     const posts = postData.map((post) => post.get({ plain: true }));

            res.render('homepage', {
                //posts,
                loggedIn: req.session.loggedIn
            });
            } catch (err) {
            res.status(500).json(err);
            }
            });

    router.get('/post/:id', async (req, res)=>{
        try {
            // Get on post by ID
            const postData = await Post.findOne({

                where: {
                    id: req.params.id
                },
               
                attributes: [
                    'id',
                    'post_body',
                    'title'    
                  ],
                  include: [
                    {
                      model: Comment,
                      attributes: ['id', 'comment_text', 'user_id', 'post_id'],
                      include: {
                        model: User,
                        attributes: ['username']
                      }
                    },
                    {
                      model: User,
                      attributes: ['username']
                    }
                  ]
                });

                if (!postData) {
                    res.status(404).json ({ message: 'No post found with this id!'});
                    return;
                }

                const post = postData.get({ plain: true});

                res.render('post', {
                    ...post,
                    logged_in: req.session.logged_in
                  });
                } catch (err) {
                  res.status(500).json(err);
                }
              });

              router.get('/login', (req, res) => {
                if (req.session.loggedIn) {
                    res.redirect('/');
                    return;
                  }
                
                  res.render('login');
                });

                router.get("/signup", (req, res) => {
                  if (req.session.loggedIn) {
                      res.redirect("/");
                  }
                  else {
                      res.render("signup");
                  }
                });



module.exports = router;

