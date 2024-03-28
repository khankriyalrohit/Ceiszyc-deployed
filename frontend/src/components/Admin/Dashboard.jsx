import React from 'react'
import './Dashboard.css'
import Sidebar from './Sidebar'
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {



  return (
    <div className = "dashbaordcss">
        <Sidebar/>
      <div className= "dashcontent">
    <div className="dash"> <h3>Events</h3> <h4>23</h4> </div>
    <div className="dash"> <h3>Guests</h3> <h4>23</h4>   </div>
    <div className="dash"> <h3>Participations</h3> <h4>23</h4> </div>
    <div className="dash"> <h3>Sponsors</h3> <h4>23</h4> </div>
    <div className="dash"> <h3>Users</h3> <h4>32</h4> </div>
      </div>
    </div>
  )
}

export default Dashboard
