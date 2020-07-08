var express = require('express');

const appError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (id) => {
  return jwt.sign({ id: id }, "my-32-character-ultra-secure-and-ultra-long-secret", {
    expiresIn: "90d",
  });
};

exports.signup = catchAsync(async(req, res,next) =>{
    
    const newuser = await User.create(req.body);
    const token = signToken(newuser._id);

    res.status(201).json({
        status: 'signup success',
        token,
        data: {
            newuser
        }
    });
});


exports.login = catchAsync(async(req, res,next) =>{
   const [{ email, password }] = await req.body;
   if (!email || !password){
       
       const app = new appError("Please provide email and password", 400);
       app.showerror(req, res);
   }
   
   const user = await User.findOne({email}).select('+password');
   
    if (!user || !(await user.correctPassword(password,user.password))){
        const app =  new appError("Invalid email or password", 401);
        app.showerror(req, res);
   }
   else{

    const token =  signToken(user._id);
    
    res.status(200).json({ 
        status: 'success',
        token,
        message: 'login success'
    })
}
});


//middleware function to see if the token is present
exports.protect = catchAsync(async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

    }

    if (!token) {
        const app = new appError("You are not logged in, login to get access to this route", 401)
        app.showerror(req, res)
    }

    const decoded = await promisify(jwt.verify)(token,"my-32-character-ultra-secure-and-ultra-long-secret")
    console.log(decoded)

    next()
});

