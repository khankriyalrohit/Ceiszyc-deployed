import { configureStore } from "@reduxjs/toolkit";
import { eventDetailsReducer, eventReducer, neweventReducer, singleeventReducer } from "./reeducers/eventreducer";
import {allUsersReducer, profileReducer, userDetailsReducer, userReducer} from "./reeducers/userReducer"
import { newteamReducer, singleteamReducer, teamDetailsReducer, teamReducer } from "./reeducers/teamreducer";
import { guestDetailsReducer, guestReducer, newguestReducer, singleguestReducer } from "./reeducers/guestreducer";
import { newsponsorReducer, singlesponsorReducer, sponsorDetailsReducer, sponsorReducer } from "./reeducers/sponsorreducer";
import {newParticipationReducer, participationReducer} from './reeducers/participationreducers'




const store = configureStore({
  reducer: {
     event : eventReducer,
     eventDetail : eventDetailsReducer,
     user : userReducer,
     userDetail : userDetailsReducer,
     profile:profileReducer,
     team : teamReducer,
     guest : guestReducer,
     sponsor : sponsorReducer,
     singleEvent : singleeventReducer,
     newEvent : neweventReducer,
     singleSponsor : singlesponsorReducer,
     newSponsor : newsponsorReducer,
     getSponsorDetails : sponsorDetailsReducer,
     singleGuest : singleguestReducer,
     newGuest : newguestReducer,
     getGuestDetails : guestDetailsReducer,
     singleTeam : singleteamReducer,
     newTeam : newteamReducer,
     getTeamDetails : teamDetailsReducer,
     allUser : allUsersReducer,
     participation : participationReducer,
     newParticipation : newParticipationReducer,
     allUsers : allUsersReducer
     
  }
});



export default store;