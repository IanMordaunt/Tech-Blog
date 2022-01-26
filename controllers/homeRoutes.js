const router = require('express').Router();
const {User, Post, Comment} = require('../models')
const withAuth = require('../utils/auth');

router.get('/', async (req, res)=>{
    try {
        const post = await Post.findAll({
           
            attributes: [
                'id',
                'post_url',
                'title'    
              ],
              include: [
                {
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id'],
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
            })
        
    }

    res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch (err) {
      res.status(500).json(err);
    }
    });
});


module.exports = router;