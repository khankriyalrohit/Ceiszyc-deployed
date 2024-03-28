import mongoose from "mongoose"

const sponsorschema = new mongoose.Schema({
    name:{
        type : String,
        required : [true,"Enter the name of the Sponsor :  "]
    },
    type:{
        type : String,
        required : [true,"Enter the type of the Sponsor :  "]
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
    
    link :{
        type: String,
        required : [true , "Enter the link to Sponsor's Website"]
    }
})

export const Sponsor = mongoose.model("Sponsor", sponsorschema);