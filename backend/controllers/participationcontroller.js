import { Event } from "../models/eventmodel.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { catchAsyncErrors } from "../middlewares/CatchAsyncError.js";
import {Participation} from '../models/participationmodel.js'

//Create new participation
export const newParticipation = catchAsyncErrors(async (req, res, next) => {

    const participation = await Participation.create({});
  
    res.status(201).json({
      success: true,
      participation,
    });
  });

  //SINGLE participation details :::
  export const getSingleParticipation = catchAsyncErrors(async(req,res,next)=>{
    const participation = await Participation.findById(req.params.id).populate("user","name email");

    if(!participation){
      return next(new ErrorHandler("No participation found",400));
    }

    res.status(200).json({
      success:true,
      participation,
    });
  })

  // Logged in Participation details (All participations)
  export const myParticipations = catchAsyncErrors(async(req,res,next)=>{
    const participations = await Participation.find({user : req.user._id});

    res.status(200).json({
      success:true,
      participations,
    })
  });

  // All participations (ADMIN only)
  export const getAllParticipations = catchAsyncErrors(async(req,res,next)=>{
    const participations = await Participation.find();

  let totalAmount = 0;
  
  participations.forEach((participation)=>{
    totalAmount += participation.totalPrice;
  })

    res.status(200).json({
      success:true,
      totalAmount,
      participations,
    })
  });

// delete Participation -- Admin
export const deleteParticipation = catchAsyncErrors(async (req, res, next) => {
  const participation = await Participation.findById(req.params.id);

  if (!participation) {
    return next(new ErrorHandler("Participation not found with this Id", 404));
  }

  await participation.deleteOne();

  res.status(200).json({
    success: true,
  });
});