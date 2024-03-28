import mongoose from "mongoose"

const eventschema = new mongoose.Schema({
    name:{
        type : String,
        required : [true,"Enter the name of the Event :  "]
    },
    description:{
        type : String,
        required : [true,"Enter the description of the Event :  "]
    },
    price:{
        type : Number,
        required : [true,"Enter the price of the Event :  "],
        maxlength : [5,"Event price cannot be greater than 5 characters"]
    },
    images :[{
        public_id:{
         type : String,
         required: true
        },
        url:{
            type : String,
            required: true
           }
    }],
    category:{
        type : String,
        required : [true,"Enter the category of the Event :  "]
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
})

export const Event = mongoose.model("Event", eventschema);