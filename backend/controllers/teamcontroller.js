import {ErrorHandler} from "../utils/ErrorHandler.js"; 
import {catchAsyncErrors} from "../middlewares/CatchAsyncError.js";
import { Team } from "../models/teammodel.js";
import cloudinary from 'cloudinary';

//Create Team Member Admin
export const createTeam =catchAsyncErrors( async(req,res,next)=>{

    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "team",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
  
    const team = await Team.create(req.body);
  
    res.status(201).json({
      success: true,
      team,
    });
  })

//Get Team
export const getAllTeam = catchAsyncErrors( async(req,res,next)=>{
    
    const teamCount = await Team.countDocuments();
    const team = await Team.find();

    res.status(200).json({
        success : true,
        team,
        teamCount,
    })
})

//Update Events Admin
export const updateTeam = catchAsyncErrors( async(req,res,next)=>{
    
    let team = await Team.findById(req.params.id)

    if(!team){

        return res.status(500).json({ 
            success : false,
            message : "Member was not found"}
        )
    }

     team = await Team.findByIdAndUpdate(req.params.id , req.body ,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })


    res.status(200).json({
        success : true,
       message : "Updation successfull",
       team
    })
})

//Delete Event
export const deleteTeam = catchAsyncErrors( async(req,res,next)=>{
    
    const team = await Team.findByIdAndRemove(req.params.id)

    
    res.status(200).json({
        success : true,
        message : "Member Removed"
    })
})

//Sponsor Details 
export const getTeamDetails = catchAsyncErrors( async(req,res,next)=>{
    
    const team = await Team.findById(req.params.id)
  
    res.status(200).json({
        success : true,
        team,
    })
  })