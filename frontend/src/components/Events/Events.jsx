import React, { Fragment, useEffect, useState } from "react"; 
import EventCard from './EventCard'
import './Events.css'
import { useSelector , useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import { useParams } from "react-router-dom";
import { clearErrors, getEvent } from '../../action/eventaction'
import Loader from "../Loader/Loader"
import Pagination from "react-js-pagination"
import { Typography } from '@mui/material';

const categories = [
  "TECH",
  "MECH",
  "ELEC",
  "Hackathon's",
  "Sports",
  "Others",
];


const Events = () => {

const dispatch = useDispatch();
const alert = useAlert();


const [category,setCategory] = useState("");


const {loading , error , event , eventCount} = useSelector((state)=>state.event)


useEffect(()=>{
  if(error){
    alert.error(error);
    dispatch(clearErrors())
    }
    dispatch(getEvent(category));
},[dispatch,error,category])

  return (
  <Fragment>
    {loading?(<Loader/>):(   <div className = "eventscss">
    <h2 className="productsHeading">Events</h2>
   <div className="products">
        {event && event.map(event=>(
          <EventCard event = {event}/>
        ))}
      </div>
      <div className="filterBox">
          
<Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
      </div>
   </div>
   
   )}

  </Fragment>
  )
}

export default Events
