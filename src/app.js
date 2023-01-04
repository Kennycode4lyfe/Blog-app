const express = require('express')
const blogRoute= require('./routes/blogRoute')
const userRoute= require('./routes/userRoute')
const database = require('./database/db')
const bodyParser = require('body-parser')
const passport= require('passport')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const blogController = require('./controllers/blogController')
const port= process.env.PORT || 4000
const app= express()
database.connectToDb()
require('./middleware/authStrategy')
// Defaults to in-memory store. 
// You can use redis or any other store.
const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 15 minutes
	max: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

//add security
app.use(helmet())


// Apply the rate limiting middleware to all requests
app.use(limiter)
require('dotenv').config()


app.use(express.json())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/user',userRoute)
app.get('/home',(req,res)=>{
    return res.json({message:"welcome to altblogApp"})
    })

app.get('/blogs', blogController.getPublishedBlogs)
app.get('/blogs/search', blogController.getPublishedBlog)

app.use('/blog',passport.authenticate('jwt',{session:false}), blogRoute)




app.use('*',(req,res)=>{
return res.status(404).json({message:"invalid request"})
})

app.listen(port, ()=>{
console.log(`app listening on ${port}`)
})