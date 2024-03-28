import React from 'react';
import {Link} from "react-router-dom";
import "./Events.css"

const EventCard = ({event}) => {

  return (
   
    <Link className='productCardd' to={`/event/${event._id}`}>
      <div className = 'productCard'>
      <img src={event.images[0].url} alt={event.name} />
    <p>{event.name}</p>
    <h4>{event.category}</h4>
    <span> Lock Seat :: ₹{event.price} </span>
      </div>
    
      </Link>
  )
}

export default EventCard
