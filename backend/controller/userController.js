const User = require('../model/userModel');
const catchAsync = require('../util/catchAsync')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')


const signup = catchAsync(async (req, res, next) => {
    const {name, email, password} = req.body;
    let existingUser;
    try {

        existingUser = await User.findOne({email: email});

    } catch (err) {
        console.log(err)
    }

    if (existingUser) {
        return res.status(400).json({
            message: "User already exist! Login instead"
        })
    }


    const hashedPassword = bcrypt.hashSync(password);


    const user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();


    res.status(201).json({
        status: 'success',
        data: user

    })
})


const login = catchAsync( async (req,res,next)=> {

    const {email,password} = req.body;

    let existingUser;

    existingUser = await User.findOne({email:email});


    if(!existingUser){
        return res.status(400).json({message: "User not found. Signup Please"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
            message: "Invalid email or Password"
        })
    }

    res.status(201).json({
        status: 'Successfully Logged in',
    })

})


exports.signup = signup;
exports.login = login;