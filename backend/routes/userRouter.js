const express = require('express');
const {signup, login, verifyToken, getUser} = require("../controller/userController");


const router = express.Router();


router.get('/', (req,res,next)=>{
    res.send("Hello World")
})

router.post('/signup', signup);
router.post('/login', login);
router.get("/user", verifyToken,getUser);



module.exports = router;