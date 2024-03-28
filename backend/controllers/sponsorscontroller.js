import {ErrorHandler} from "../utils/ErrorHandler.js"; 
import {catchAsyncErrors} from "../middlewares/CatchAsyncError.js";
import { Sponsor } from "../models/sponsorsmodel.js";
import cloudinary from 'cloudinary';

//Create Event Admin
export const createSponsor =catchAsyncErrors( async(req,res,next)=>{

    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "sponsors",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
  
    const sponsor = await Sponsor.create(req.body);
  
    res.status(201).json({
      success: true,
      sponsor,
    });
  })

//Get Team
export const getAllSponsor = catchAsyncErrors( async(req,res,next)=>{
    
    const sponsorCount = await Sponsor.countDocuments();
    const sponsor = await Sponsor.find();

    res.status(200).json({
        success : true,
        sponsor,
        sponsorCount,
    })
})

//Update Events Admin
export const updateSponsor = catchAsyncErrors( async(req,res,next)=>{
    
    let sponsor = await Sponsor.findById(req.params.id)

    if(!sponsor){

        return res.status(500).json({ 
            success : false,
            message : "Sponsor was not found"}
        )
    }

     sponsor = await Sponsor.findByIdAndUpdate(req.params.id , req.body ,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })


    res.status(200).json({
        success : true,
       message : "Updation successfull",
       sponsor
    })
})

//Delete Event
export const deleteSponsor = catchAsyncErrors( async(req,res,next)=>{
    
    const sponsor = await Sponsor.findByIdAndRemove(req.params.id)

    
    res.status(200).json({
        success : true,
        message : "Member Removed"
    })
})

//Sponsor Details 
export const getSponsorsDetails = catchAsyncErrors( async(req,res,next)=>{
    
  const sponsor = await Sponsor.findById(req.params.id)

  res.status(200).json({
      success : true,
      sponsor,
  })
})