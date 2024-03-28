import React, { Fragment, useEffect, useState } from "react"; 
import { useSelector , useDispatch} from "react-redux"
import './Team.css'
import TeamCard from './TeamCard'
import Loader from '../Loader/Loader'
import { useAlert } from "react-alert";
import { clearErrors, getTeam } from "../../action/teamaction";


const Team = () => {

     const dispatch = useDispatch()
     const alert = useAlert();

     const {team,loading,error,teamCount} = useSelector((state)=>state.team)

     useEffect(()=>{
         if(error){
            alert.error(error);
            dispatch(clearErrors())
         }
         dispatch(getTeam())
     },[dispatch,error])

  return (
    <Fragment>
        {loading ? (<Loader/>):(<div className = "teamcss">
    <h2 className="teamHeading">Our Team</h2>
    <div className = "message">
        <h2>Message</h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores debitis pariatur sunt delectus, repudiandae ea molestias. Qui aliquid fuga aliquam quidem totam dolor nemo consequuntur rerum sit soluta! Recusandae illo ducimus blanditiis reiciendis voluptatum!
        </p>
    </div>
   <div className="myteam">
    {team && team.map(team=>(
        <TeamCard team = {team}/>
    ))}
      </div>
   </div>)}
    </Fragment>
  )
}

export default Team
