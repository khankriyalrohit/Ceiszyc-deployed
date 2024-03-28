import mongoose from "mongoose"

const teamschema = new mongoose.Schema({
    name:{
        type : String,
        required : [true,"Enter the name of the Event :  "]
    },
    branch:{
        type : String,
        required : [true,"Enter the description of the Event :  "]
    },
    year:{
        type : Number,
        required : [true,"Enter the price of the Event :  "],
        maxlength : [1,"Event price cannot be greater than 1 characters"]
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
    contribution:{
        type : String,
        required : [true,"Enter the category of the Event :  "]
    },
})

export const Team = mongoose.model("Team", teamschema);