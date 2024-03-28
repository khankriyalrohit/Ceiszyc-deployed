import React, { Fragment, useEffect, useState } from "react"; 
import "./Eventdeatils.css"
import { useSelector , useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import { clearErrors, getEventDetails } from "../../action/eventaction";
import { useParams } from "react-router-dom";
import Loader from '../Loader/Loader'

const EventDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  
  
  const {error, event , loading} = useSelector((state)=>state.eventDetail);


 useEffect(()=> {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
      }
      dispatch(getEventDetails(id));
  },[dispatch,error,id])

  return (
    <Fragment>
      {loading ? (<Loader/>): (<div className = "containerhemlo">
   <div className = "innerdiv">
   <div className="imagecontainer">
        {/* <img src={event.images[0].url} alt={event.name} /> */}
    </div>
    <div className="detailscontainer">
        <h3>{event.name}</h3>
        <h5>{event.category} </h5>
        <p>{event.description}</p>
        <h6>Price : {event.price}</h6>
       <button className = "buttone" >Participate</button>
    </div>
   </div>
    </div>)}
    </Fragment>
  )
}

export default EventDetails
