const User = require('../model/userModel');
const catchAsync = require('../util/catchAsync');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

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
            message: "User already exist! Login instead",
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


const login = catchAsync(async (req, res, next) => {

    const {email, password} = req.body;

    let existingUser;

    existingUser = await User.findOne({email: email});


    if (!existingUser) {
        return res.status(400).json({message: "User not found. Signup please"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })

    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60),
        httpOnly: true,
        sameSite: 'lax'
    })

    res.status(201).json({
        status: 'Successfully logged in',
        user: existingUser,
        token
    })

})


const verifyToken = catchAsync(async (req, res, next) => {

    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1]

    if (!token) {
        res.status(404).json({
            message: "No token found"
        })
    }
    jwt.verify(String(token), process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(400).json({
                message: "Invalid token"
            })
        }
        console.log(data.id);
        req.id = data.id;

    })
    next();

});


const getUser = catchAsync(async (req, res, next) => {
    const userId = req.id;
    let user;
        user = await User.findById(userId, "-password");


        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json({
            user
        })



})


exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;