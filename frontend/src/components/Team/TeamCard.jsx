import React, { Fragment, useEffect, useState } from "react"; 
import {Link} from "react-router-dom";
import "./Team.css"

const TeamCard = ({ team }) => {

  return (

      <div className = 'teamCard'>
      <img src={team.images[0].url}alt={team.name} />
      <h4>{team.name}</h4>
    <p> {team.contribution} </p>
    <p>{team.branch} {team.year}th Year</p>
      </div>
  )
}

export default TeamCard
