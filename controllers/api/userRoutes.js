const router = require('express').Router();
const { User} = require('../../models');

//add a user

router.post('/', (req, res)=> {
  User.create({
    user_name: req.body.user_name,
    password: req.body.password
  }).then((userData)=>{
    
    req.session.save(()=>{
      req.session.userId =  userData.id;
      req.session.username = userData.user_name;
      req.session.loggedIn = true

      res.json(userData)
    })
  }).catch((err)=> res.status(500).json(err))
})

//login a user

router.post('/login', (req, res)=>{
  User.findOne({
    where: {
      user_name: req.body.user_name
    }
  }).then((userData)=>{
    if(!userData){
      res.status(400).json({message: "no user found!"})
      return
    }

    const passwordOk = userData.checkPassword(req.body.password);

    if(!passwordOk){
      res.status(400).json({message: "Incorrect Password!"})
      return
    }

    req.session.save(()=>{
      req.session.userId =  userData.id;
      req.session.username = userData.user_name;
      req.session.loggedIn = true

      res.json(userData)
    })

  }).catch((err)=> res.status(500).json(err))
})

// Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  