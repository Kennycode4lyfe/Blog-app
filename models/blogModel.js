const mongoose= require('mongoose')
const userSchema = require('../models/userModel')
const schema= mongoose.Schema
const ObjectId = schema.Types.ObjectId
const blogSchema = new schema({

title:{type:String, unique:true, required:true},
Description:{type:String, required:false},
author:{type:ObjectId, ref: 'users'},
state:{type:String, default:'draft'},
read_count:{type:Number, default:0},
reading_time:{type:String},
tags:[{type:String}],
body:{type:String,required:true},
timestamp:{created_at:{type:Date, default:Date.now},
updated_at:{type:Date, default:Date.now}}
})



module.exports= mongoose.model('Blog', blogSchema)