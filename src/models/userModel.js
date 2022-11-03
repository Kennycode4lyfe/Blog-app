const mongoose= require('mongoose')
const blogSchema =require('../models/blogModel')
const bcrypt= require("bcrypt")
const schema= mongoose.Schema
const ObjectId = schema.Types.ObjectId

const userModel = new schema({
id: ObjectId ,
created_at: {type:Date,default:Date.now()},
first_name: {type: String, required: true},
last_name: {type: String, required:true},
email:{type:String, required:true, unique: true},
password:{type:String , required:true}
})


userModel.pre('save', async function(next){
    console.log('process hash')
const user = this
const hash= await bcrypt.hash(this.password,10)
this.password= hash
next()
})


userModel.methods.isValidPassword= async function (password){
const user= this 
const compare =await bcrypt.compare(password,user.password)
return compare
}

module.exports= mongoose.model('users',userModel)