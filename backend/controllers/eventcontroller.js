import {Event} from "../models/eventmodel.js";
import {ErrorHandler} from "../utils/ErrorHandler.js"; 
import {ApiFeatures} from "../utils/ApiFeatures.js"; 
import {catchAsyncErrors} from "../middlewares/CatchAsyncError.js";
import cloudinary from 'cloudinary';

//Create Event Admin
export const createEvent =catchAsyncErrors( async(req,res,next)=>{

    let images = [];
  
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "events",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
  
    const event = await Event.create(req.body);
  
    res.status(201).json({
      success: true,
      event,
    });
  })
  

//Get All Products User
export const getAllEvents = catchAsyncErrors( async(req,res,next)=>{
    
    const eventCount = await Event.countDocuments();
    const apifeatures = new ApiFeatures(Event.find(),req.query).search().filter()
    // const event = await Event.find();

    const event = await apifeatures.query

    res.status(200).json({
        success : true,
        event,
        eventCount,
 
    })
})

//Get All Products Admin
export const getAdminEvents = catchAsyncErrors( async(req,res,next)=>{
    
    const event = await Event.find();

    res.status(200).json({
        success : true,
        event,
    })
})

//Update Events Admin
export const updateEvent = catchAsyncErrors( async(req,res,next)=>{
    
    let event = await Event.findById(req.params.id)

    if(!event){

        return res.status(500).json({ 
            success : false,
            message : "Event was not found"}
        )
    }

     event = await Event.findByIdAndUpdate(req.params.id , req.body ,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })


    res.status(200).json({
        success : true,
       message : "Updation successfull",
       event
    })
})

//Event Details 
export const getEventsDetails = catchAsyncErrors( async(req,res,next)=>{
    
    const event = await Event.findById(req.params.id)

    res.status(200).json({
        success : true,
        event,
    })
})

//Delete Event
export const deleteEvent = catchAsyncErrors( async(req,res,next)=>{
    
    const event = await Event.findByIdAndRemove(req.params.id)

    

    res.status(200).json({
        success : true,
        message : "Event Deleted"
    })
})
