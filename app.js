const express = require('express')
const blogRoute= require('./routes/blogRoute')
const userRoute= require('./routes/userRoute')
const database = require('./database/db')
const bodyParser = require('body-parser')
const passport= require('passport')
const blogController = require('./controllers/blogController')
const port= process.env.PORT || 4000
const app= express()
database.connectToDb()
require('./middleware/authStrategy')
require('dotenv').config()


app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/home',(req,res)=>{
    return res.json({message:"welcome to altblogApp"})
    })
app.get('/all-published-blogs', blogController.getPublishedBlogs)
app.get('/a-published-blog', blogController.getPublishedBlog)
app.use('/user',userRoute)
app.use('/blog',passport.authenticate('jwt',{session:false}), blogRoute)




app.use('*',(req,res)=>{
return res.status(404).json({message:"invalid request"})
})

app.listen(port, ()=>{
console.log(`app listening on ${port}`)
})