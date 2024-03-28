import mongoose from "mongoose"

const guestschema = new mongoose.Schema({
    name:{
        type : String,
        required : [true,"Enter the name of the Performer :  "]
    },
    field:{
        type : String,
        required : [true,"Enter the field of the Performer :  "]
    },
    date:{
        type : String,
        required : [true,"Enter the date of the Performer :  "],
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
})

export const Guest = mongoose.model("Guest", guestschema );