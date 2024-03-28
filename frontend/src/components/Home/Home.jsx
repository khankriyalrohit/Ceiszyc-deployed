import React, { Fragment, useEffect, useState } from "react"; 
import {CgMouse} from "react-icons/cg"
import { useSelector , useDispatch} from "react-redux"
import {useAlert} from "react-alert"
import "./Home.css"
import { clearErrors, getGuest } from '../../action/guestaction'

// const guest = {
//   name : "JUBIN NAUTIYAL",
//   field : "Singer",
//   date : 3/9/25,
//   images : [{url : "https://pbs.twimg.com/media/DzjQ7adWsAAPQM-.jpg"}]
// }


const Home = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const {loading,error,guest} = useSelector((state)=>state.guest);

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getGuest())
  },[dispatch,error])


  return (
    <Fragment>
      <div className="banner">
      <p>Ceiszyc</p>
      <h1>Glad That You're Back</h1>

      <a href="#container">
        <button>
          Scroll <CgMouse/>
        </button>
      </a>
    </div> 
    <div className = "LowerBody">
     <h1 className="homeheading">
        Scehdule
     </h1>
     <div className="container" id="container">
        <div className = "tiles">
            <div className="imgcontainer">
             <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/white_hat_hacker.jpg" alt="Tech Fest" />
            </div>
            <div className="infocontainer">
              <h1> Tech Fest </h1>
              <h2> 20 March 2023</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim ipsum aliquid ducimus beatae nisi magnam numquam eveniet voluptatum earum placeat corporis blanditiis, iure neque voluptatem quas autem dolor ratione commodi inventore minima obcaecati voluptate? Totam optio incidunt sed officiis animi.</p>              
              <h4>Venue: College Campus</h4>
              <h5> Timing: 10am Onwards</h5>
            </div>
        </div>
        <div className = "tiles">
            <div className="imgcontainer">
             <img src="https://wallpapercave.com/wp/cAO5uXj.jpg" alt="Tech Fest" />
            </div>
            <div className="infocontainer">
              <h1> Sports Fest </h1>
              <h2> 21 March 2023</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim ipsum aliquid ducimus beatae nisi magnam numquam eveniet voluptatum earum placeat corporis blanditiis, iure neque voluptatem quas autem dolor ratione commodi inventore minima obcaecati voluptate? Totam optio incidunt sed officiis animi.</p>              
              <h4>Venue: College Ground</h4>
              <h5> Timing: 10am Onwards</h5>
            </div>
        </div>
        <div className = "tiles">
            <div className="imgcontainer">
             <img src="https://youthincmag.com/wp-content/uploads/2020/12/Pinterest-.jpg" alt="Tech Fest" />
            </div>
            <div className="infocontainer">
              <h1> Dj Night and Light Show </h1>
              <h2> 22 March 2023</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim ipsum aliquid ducimus beatae nisi magnam numquam eveniet voluptatum earum placeat corporis blanditiis, iure neque voluptatem quas autem dolor ratione commodi inventore minima obcaecati voluptate? Totam optio incidunt sed officiis animi.</p>              
              <h4>Venue: College Ground</h4>
              <h5> Timing 8pm Onwards</h5>
            </div>
        </div>

     </div>
     
     <h1 className="homeheading">
        Performers
     </h1>
<div className = "LastSection">
    {guest && guest.map(guest=>(
      <div className="celebrity">
      <div className = "celebrityimg"><img src={guest.images[0].url} alt={guest.name} /></div>
      <div className="celebrityabout"> 
      <h3>{guest.name}</h3>
      <h4>{guest.field}</h4> 
      </div>
  </div>
    ))}
</div>
</div>
    </Fragment>
    
  )
}

export default Home
