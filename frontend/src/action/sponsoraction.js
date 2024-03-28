import axios from 'axios';

import { 
    ALL_SPONSOR_FAIL,
    ALL_SPONSOR_REQUEST,
    ALL_SPONSOR_SUCCESS, 
    ADMIN_SPONSOR_REQUEST,
    ADMIN_SPONSOR_SUCCESS,
    ADMIN_SPONSOR_FAIL,
    NEW_SPONSOR_REQUEST,
    NEW_SPONSOR_SUCCESS,
    NEW_SPONSOR_FAIL,
    NEW_SPONSOR_RESET,
    UPDATE_SPONSOR_REQUEST,
    UPDATE_SPONSOR_SUCCESS,
    UPDATE_SPONSOR_FAIL,
    DELETE_SPONSOR_REQUEST,
    DELETE_SPONSOR_SUCCESS,
    DELETE_SPONSOR_FAIL,
    SPONSOR_DETAILS_REQUEST,
    SPONSOR_DETAILS_SUCCESS,
    SPONSOR_DETAILS_FAIL,
    CLEAR_ERRORS,} from "../constants/sponsorconstants.js";

export const getSponsor = ()=>async(dispatch)=>{
    try{
      dispatch({type : ALL_SPONSOR_REQUEST});
      let link = `/api/v1/sponsor` ;
      const { data }  = await axios.get(link);
      dispatch({
      type : ALL_SPONSOR_SUCCESS,
      payload :data,
    })
    } catch(error) {
      dispatch({type : ALL_SPONSOR_FAIL,
        payload : error.response.data.message,
    });
    }
};

// Get Team For Admin
export const getAdminSponsor= () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_SPONSOR_REQUEST });

    const { data } = await axios.get("/api/v1/admin/sponsor");

    dispatch({
      type: ADMIN_SPONSOR_SUCCESS,
      payload: data.sponsor,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_SPONSOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Team
export const createSponsor = (sponsorData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SPONSOR_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/sponsor/new`,
      sponsorData,
      config
    );

    dispatch({
      type: NEW_SPONSOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_SPONSOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Team
export const updateSponsor = (id, sponsorData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SPONSOR_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/sponsor/update/${id}`,
      sponsorData,
      config
    );

    dispatch({
      type: UPDATE_SPONSOR_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SPONSOR_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Team
export const deleteSponsor = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SPONSOR_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/sponsor/delete/${id}`);

    dispatch({
      type: DELETE_SPONSOR_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SPONSOR_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Get Sponsors Details
export const getSponsorDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SPONSOR_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/sponsor/${id}`);

    dispatch({
      type: SPONSOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SPONSOR_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};


//Clear Errors
export const clearErrors = ()=>async(dispatch)=>{
  dispatch({type : CLEAR_ERRORS})
  
}



