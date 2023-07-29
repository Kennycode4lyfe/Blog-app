const passport= require('passport')
const { validate } = require('../models/userModel')
const localStrategy = require('passport-local').Strategy
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const userModel = require("../models/userModel")

passport.use(new jwtStrategy({
secretOrKey: process.env.JWT_SECRET,
jwtFromRequest: extractJwt.fromUrlQueryParameter('secret-token')
// jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken()
},async (token,done)=>{
    try{
        console.log(token.user)
        return done(null, token.user)
    }
    catch(error){
        done(error)
    }
}))



passport.use('signup',
new localStrategy(
{usernameField: 'email',
passwordField:'password',
passReqToCallback : true
},
async (req,email,password,done)=>{
try{
    console.log(req.headers)
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    const user= await userModel.create({first_name,last_name,email,password})
    return done(null,user)
}
catch(error){
    done(error)
}
}
)
)



passport.use('login', 
new localStrategy({
usernameField: 'email',
passwordField: 'password'
},
async(email,password,done)=>{
try{
    const user = await userModel.findOne({email})

if(!user){
    return done(null,false,{message: 'user not found'})
}   
const validate = await user.isValidPassword(password) 
if(!validate){
    return done(null, false,{message:'wrong password'})
}
return done(null, user, {message:"logged in"})
}
catch(error){
    return done(error)
}
}

))