import {app} from "./app.js";
import dotenv from "dotenv" ;
import { connectDatabase } from "./config/database.js";
import cloudinary from 'cloudinary'

// Unhandled Unchaught Exception 
process.on("uncaughtException",err=>{
    console.log(`Error : : ${err.message}`);
    console.log("Shutting down the server dur to Unhandled Unchaught Exception");
    process.exit(1);
})

//Config File 

dotenv.config({"path": "./config/config.env"});

// dotenv.config({"path": "./backend/config/config.env"});


//Cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


// Database connection
connectDatabase()


//Listen at PORT 
app.listen(process.env.PORT,()=>{
    console.log(`The server is running on PORT : ${process.env.PORT}`);
})

// Unhandled Promise Reajection
process.on("unhandledRejection",err=>{
    console.log(`Error : : ${err.message}`);
    console.log("Shutting down the server dur to Unhandled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    });
})