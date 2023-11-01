const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;


const connectToDb = function(){


    // mongoose.connect(MONGODB_URL||`mongodb://admin:password@localhost:27017`); 
    mongoose.connect(`mongodb://admin:password@0.0.0.0:27017/`,{
      // user:'admin',
      // pass: 'password',
      useNewUrlParser:true
    });
    

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB Successfully");
    });
    
    mongoose.connection.on("error", (err) => {
      console.log("An error occurred while connecting to MongoDB");
      console.log(err);
    });

}

module.exports = {connectToDb}