const express = require('express')
const blogController =require('../controllers/blogController')
const blogRouter= express.Router()


blogRouter.get('/user', blogController.getUserBlogs)

blogRouter.post('/create',blogController.createBlog)

blogRouter.put('/publish/:title',blogController.publishBlog)

blogRouter.put('/draft/:title', blogController.editBlog)

blogRouter.delete('/:title', blogController.deleteBlog)




module.exports= blogRouter