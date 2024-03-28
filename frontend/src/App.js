import './App.css';
import React from 'react';
import {BrowserRouter as Router , Route , Routes} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Events from './components/Events/Events';
import Sponsors from './components/Sponsors/Sponsors';
import Team from './components/Team/Team';
import store from './store.js';
import EventDetails from './components/Events/EventDetails';
import Search from './components/Events/Search';
import About from './components/About/About';
import LoginSignup from './components/User/LoginSignup';
import Profile from './components/User/Profile';
import UserOptions from './components/Header/UserOptions';
import UpdateProfile from './components/User/UpdateProfile';
import Dashboard from './components/Admin/Dashboard';
import AdminEvents from './components/Admin/AdminEvents';
import NewEvent from './components/Admin/NewEvent';
import UpdateEvent from './components/Admin/UpdateEvent';
import AdminSponsor from './components/Admin/AdminSponsor';
import NewSponsor from "./components/Admin/NewSponsor";
import UpdateSponsor from './components/Admin/UpdateSponsor'
import AdminGuests from './components/Admin/AdminGuests'
import NewGuests from './components/Admin/NewGuests';
import UpdateGuest from './components/Admin/UpdateGuest'
import AdminTeam from './components/Admin/AdminTeam';
import NewTeam from './components/Admin/NewTeam'
import UpdateTeam from './components/Admin/UpdateTeam';
import AdminUsers from './components/Admin/AdminUsers'
import AdminParticipations from './components/Admin/AdminParticipations';
import { loadUser } from './action/useraction';
import Contact from './components/About/Contact'


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  React.useEffect(()=>{

    store.dispatch(loadUser())
  },[dispatch]);


  return (
<Router>
  {isAuthenticated && <UserOptions user={user} />}
  <Header/>
  <Routes>
   <Route exact path = "/" element = {<Home/>}/>
   <Route exact path = "/events" element = {<Events/>}/>
   <Route exact path = "/sponsors" element = {<Sponsors/>}/>
   <Route exact path = "/event/:id" element = {<EventDetails/> }/>
   <Route exact path = "/team" element = {<Team/>}/>
   <Route exact path = "/Search" element = {<Search/>}/>
   <Route exact path = "/About" element = {<About/>}/>
   <Route exact path = "/login" element = {<LoginSignup/>}/>
   {isAuthenticated &&  <Route exact path = "/account" element = {<Profile/>}/>}
   {isAuthenticated &&  <Route exact path = "/me/update" element = {<UpdateProfile/>}/>}

   {/* For Updation  */}
   { isAuthenticated && <Route exact path = "/admin/dashboard" element = {<Dashboard/>}/> }
  
   { isAuthenticated &&<Route exact path = "/admin/events" element = {<AdminEvents/>}/> }   
   { isAuthenticated &&<Route exact path = "/admin/event/new" element = {<NewEvent/>}/> }
   { isAuthenticated &&<Route exact path = "/admin/event/:id" element = {<UpdateEvent/> }/> }   

   { isAuthenticated &&<Route exact path = "/admin/sponsors" element = {<AdminSponsor/>}/> }
   { isAuthenticated &&<Route exact path = "/admin/sponsor/new" element = {<NewSponsor/>}/> }  
   { isAuthenticated &&<Route exact path = "/admin/sponsor/:id" element = {<UpdateSponsor/>}/> } 

   { isAuthenticated &&<Route exact path = "/admin/guests" element = {<AdminGuests/>}/> }
   { isAuthenticated &&<Route exact path = "/admin/guest/new" element = {<NewGuests/>}/> }  
   { isAuthenticated &&<Route exact path = "/admin/guest/:id" element = {<UpdateGuest/>}/> }

   { isAuthenticated &&<Route exact path = "/admin/team" element = {<AdminTeam/>}/> }
   { isAuthenticated &&<Route exact path = "/admin/team/new" element = {<NewTeam/>}/> }
   { isAuthenticated &&<Route exact path = "/admin/team/:id" element = {<UpdateTeam/>}/> }

   { isAuthenticated &&<Route exact path = "/admin/users" element = {<AdminUsers/>}/> }

   { isAuthenticated &&<Route exact path = "/admin/participations" element = {<AdminParticipations/>}/> }
    
   { isAuthenticated &&<Route exact path = "/contactus" element = {<Contact/> }/> }
    
  </Routes>
  <Footer/>
</Router>
  );
}

export default App;
