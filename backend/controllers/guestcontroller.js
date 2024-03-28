import {ErrorHandler} from "../utils/ErrorHandler.js"; 
import {catchAsyncErrors} from "../middlewares/CatchAsyncError.js";
import {Guest} from "../models/guestmodel.js";
import cloudinary from 'cloudinary';

//Create Guest Member Admin
export const createGuest =catchAsyncErrors( async(req,res,next)=>{

    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "guests",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
  
    const guest = await Guest.create(req.body);
  
    res.status(201).json({
      success: true,
      guest,
    });
  })

//Get Team
export const getAllGuest = catchAsyncErrors( async(req,res,next)=>{
    
    const guestCount = await Guest.countDocuments();
    const guest = await Guest.find();

    res.status(200).json({
        success : true,
        guest,
        guestCount,
})
})

//Update Events Admin
export const updateGuest = catchAsyncErrors( async(req,res,next)=>{
    
    let guest = await Guest.findById(req.params.id)

    if(!guest){

        return res.status(500).json({ 
            success : false,
            message : "Member was not found"}
        )
    }

     guest = await Guest.findByIdAndUpdate(req.params.id , req.body ,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })


    res.status(200).json({
        success : true,
       message : "Updation successfull",
       guest
    })
})

//Delete Event
export const deleteGuest = catchAsyncErrors( async(req,res,next)=>{
    
    const guest = await Guest.findByIdAndRemove(req.params.id)

    
    res.status(200).json({
        success : true,
        message : "Member Removed"
    })
})

//Event Details 
export const getGuestsDetails = catchAsyncErrors( async(req,res,next)=>{
    
  const guest = await Guest.findById(req.params.id)

  res.status(200).json({
      success : true,
      guest,
  })
})