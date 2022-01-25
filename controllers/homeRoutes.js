const router = require('express').Router();

router.get('/', (req, res)=>{
    const obj = {
        name: "Ian", 
        id: 4, 
        food: "sushi"
    }

    res.render('homepage', { obj })
})

router.get('/login', (req, res)=>{

    res.render('login')
})


module.exports = router;