const express = require('express');
const {signup, login} = require("../controller/userController");


const router = express.Router();


router.get('/', (req,res,next)=>{
    res.send("Hello World")
})

router.post('/signup', signup);
router.post('/login', login);



module.exports = router;