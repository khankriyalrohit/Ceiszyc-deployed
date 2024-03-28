import React from 'react';
import {Link} from "react-router-dom";
import "./Sponsors.css"

const SponsorCard = ({sponsor}) => {

  return (
   
    <Link className='sponsorCardd' to={sponsor.link}>
      <div className = 'sponsorCard'>
      <h4>{sponsor.type}</h4>
      <img src={sponsor.images[0].url}alt={sponsor.name} />
    <p>{sponsor.name}</p>
      </div>
    
      </Link>
  )
}

export default SponsorCard
