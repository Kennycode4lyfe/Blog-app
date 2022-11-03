const express = require('express')
const blogController =require('../controllers/blogController')
const blogRouter= express.Router()


blogRouter.get('/user-blogs', blogController.getUserBlogs)

blogRouter.post('/create-blog',blogController.createBlog)

blogRouter.put('/publish-blog/:title',blogController.publishBlog)

blogRouter.put('/edit-blog/:title', blogController.editBlog)

blogRouter.delete('/delete-blog/:title', blogController.deleteBlog)




module.exports= blogRouter