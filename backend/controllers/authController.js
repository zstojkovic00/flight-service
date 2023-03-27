const { promisify } = require('util');
const User = require('../models/userModel');
const catchAsync = require('../util/catchAsync');
const jwt  = require('jsonwebtoken');
const AppError = require('../util/AppError');

const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);


    // Remove password and active from output
    user.password = undefined;
    user.active = undefined;

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        user
    });
};
exports.signup = catchAsync(async (req,res, next)=>{
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        passwordChangedAt: req.body.passwordChangedAt,
        role: req.body.role,

    });
    const url = `${req.protocol}://${req.get('host')}/me`;
    createSendToken(newUser,201,res);

});


exports.login = catchAsync(async (req,res,next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if(!email || !password){
        return  next(new AppError('Please provide email and password!', 400));
    }

    // 2) Check if user exist && password is correct
    const user = await User.findOne({email}).select('+password')

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password', 401))
    }



    // 3) If everything is okay, send token to client
    createSendToken(user,200,res);
});


exports.logout = (req, res) => {

    res.clearCookie('jwt');
    res.status(200).json({ status: 'success' });
};


exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    } else if (req.cookies.jwt && req.cookies.jwt !== 'loggedout') {
        token = req.cookies.jwt;
    }

    if(!token) {
        res.redirect('/')
        return next(new AppError('You are not logged in. Please login to get access.', 401))
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});



// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            // 3) Check if user changed password after the token was issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }

            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};


exports.restrictTo = (... roles) => {
    return (req, res, next) => {
        // roles ['admin','lead-guide']. role = 'user'
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have premission to perform this action', 403))
        }
        next();
    };
};


