import mongoose from 'mongoose'

const participationSchema = new mongoose.Schema({
 
      eventname: {
        type: String,
        required: true,
      },
      username : {
        type: String,
        required: true,
      },
      eventprice: {
        type: Number,
        required: true,
      },
      eventID: {
        type: String,
        required: true,
      },
      userID: {
        type: String,
        required: true,
       },
       bookedAt: {
          type : Date,
          default : Date.now
       },
      //  user: {
      //   type: mongoose.Schema.ObjectId,
      //   ref: "User",
      //   required: true,
      // }
});

export const Participation = mongoose.model("Participation", participationSchema);