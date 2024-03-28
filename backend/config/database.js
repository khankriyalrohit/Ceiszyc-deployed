// import mongoose from "mongoose";

// export const connectDatabase = () => {
//   mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true , useUnifiedTopology:true}).then((data) => {
//       console.log(`Mongodb connect to: ${data.connection.host}`);
//     }).catch((e) => {
//       console.log(e);
//     });
// };

import mongoose from 'mongoose';
// const mongoose = require("mongoose");
// const colors = require("colors");
import dotenv from 'dotenv';
// const dotenv = require('dotenv');

export const connectDatabase = async()=>{
  try{
    await mongoose.connect(`${process.env.DB_URI}`);
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`
    );
  } 
  catch(err){
    console.log(`Mil gya error ${err}`) 
  }
};

// module.exports = connectDatabase; 
