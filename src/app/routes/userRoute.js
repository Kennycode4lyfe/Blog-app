const express= require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const userController = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/sign-up',passport.authenticate('signup',{session:false}), userController.signup)


userRouter.post('/login' , async (req,res,next) => passport.authenticate('login', (err,user,info)=>{
    userController.login(req,res, {err,user,info})
})(req,res,next))


module.exports = userRouter