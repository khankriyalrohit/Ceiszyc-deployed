import axios from 'axios';

import { 
    ALL_TEAM_FAIL,
    ALL_TEAM_REQUEST,
    ALL_TEAM_SUCCESS, 
    ADMIN_TEAM_REQUEST,
    ADMIN_TEAM_SUCCESS,
    ADMIN_TEAM_FAIL,
    NEW_TEAM_REQUEST,
    NEW_TEAM_SUCCESS,
    NEW_TEAM_FAIL,
    NEW_TEAM_RESET,
    UPDATE_TEAM_REQUEST,
    UPDATE_TEAM_SUCCESS,
    UPDATE_TEAM_FAIL,
    DELETE_TEAM_REQUEST,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FAIL,
    TEAM_DETAILS_REQUEST,
    TEAM_DETAILS_SUCCESS,
    TEAM_DETAILS_FAIL,
    CLEAR_ERRORS,} from "../constants/teamconstants.js";

export const getTeam = ()=>async(dispatch)=>{
    try{
      dispatch({type : ALL_TEAM_REQUEST});
      let link = `/api/v1/team` ;
      const { data }  = await axios.get(link);
      dispatch({
      type : ALL_TEAM_SUCCESS,
      payload :data,
    })
    } catch(error) {
      dispatch({type : ALL_TEAM_FAIL,
        payload : error.response.data.message,
    });
    }
};

// Get Team For Admin
export const getAdminTeam = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TEAM_REQUEST });

    const { data } = await axios.get("/api/v1/admin/team");

    dispatch({
      type: ADMIN_TEAM_SUCCESS,
      payload: data.team,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TEAM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Team
export const createTeam = (teamData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_TEAM_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/team/new`,
      teamData,
      config
    );

    dispatch({
      type: NEW_TEAM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TEAM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Team
export const updateTeam = (id, teamData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TEAM_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/team/update/${id}`,
      teamData,
      config
    );

    dispatch({
      type: UPDATE_TEAM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TEAM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Team
export const deleteTeam = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TEAM_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/team/delete/${id}`);

    dispatch({
      type: DELETE_TEAM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TEAM_FAIL,
      payload: error.response.data.message,
    });
  }
};



// Get Team Details
export const getTeamDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEAM_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/team/${id}`);

    dispatch({
      type: TEAM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TEAM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Errors
export const clearErrors = ()=>async(dispatch)=>{
  dispatch({type : CLEAR_ERRORS})
  
}



