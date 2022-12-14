const express = require('express')
const blogRoute= require('./routes/blogRoute')
const userRoute= require('./routes/userRoute')
const database = require('./database/db')
const bodyParser = require('body-parser')
const passport= require('passport')
const blogController = require('./controllers/blogController')
const app= express()
require('./middleware/authStrategy')
require('dotenv').config()



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.get('/home',(req,res)=>{
    return res.json({message:"welcome to altblogApp"})
    })
app.get('/blogs', blogController.getPublishedBlogs)
app.get('/blogs/search', blogController.getPublishedBlog)
app.use('/user',userRoute)
app.use('/blog',passport.authenticate('jwt',{session:false}), blogRoute)




app.use('*',(req,res)=>{
return res.status(404).json({message:"invalid request"})
})

module.exports = app