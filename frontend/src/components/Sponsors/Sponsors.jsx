import React, { Fragment, useEffect, useState } from "react"; 
import './Sponsors.css'
import SponsorCard from './SponsorCard'
import { useSelector , useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import { clearErrors, getSponsor } from "../../action/sponsoraction";
import Loader from "../Loader/Loader";

const Sponsors = () => {
  const dispatch = useDispatch();
  const alert = useAlert()

  const {sponsor , loading , error , sponsorCount} = useSelector((state)=>state.sponsor);

  useEffect(()=>{
     if(error){
      alert.error(error);
      dispatch(clearErrors())
     }
    dispatch(getSponsor())
  },[dispatch,error])


  return (
   <Fragment>
    {loading?(<Loader/>):(<div className = "sponsorscss">
    <h2 className="sponsorsHeading">Sponsors</h2>
   <div className="sponsors">
    {sponsor && sponsor.map(sponsor=>(
      <SponsorCard sponsor = {sponsor}/>
    ))}
      </div>
   </div>)}
   </Fragment>
  )
}

export default Sponsors
