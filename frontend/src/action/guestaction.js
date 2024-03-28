import axios from 'axios';

import { 
    ALL_GUEST_FAIL,
    ALL_GUEST_REQUEST,
    ALL_GUEST_SUCCESS, 
    ADMIN_GUEST_REQUEST,
    ADMIN_GUEST_SUCCESS,
    ADMIN_GUEST_FAIL,
    NEW_GUEST_REQUEST,
    NEW_GUEST_SUCCESS,
    NEW_GUEST_FAIL,
    NEW_GUEST_RESET,
    UPDATE_GUEST_REQUEST,
    UPDATE_GUEST_SUCCESS,
    UPDATE_GUEST_FAIL,
    DELETE_GUEST_REQUEST,
    DELETE_GUEST_SUCCESS,
    DELETE_GUEST_FAIL,
    GUEST_DETAILS_REQUEST,
    GUEST_DETAILS_SUCCESS,
    GUEST_DETAILS_FAIL,
    CLEAR_ERRORS,} from "../constants/guestconstants.js";

export const getGuest = ()=>async(dispatch)=>{
    try{
      dispatch({type : ALL_GUEST_REQUEST});
      let link = `/api/v1/guest` ;
      const { data }  = await axios.get(link);
      dispatch({
      type : ALL_GUEST_SUCCESS,
      payload :data,
    })
    } catch(error) {
      dispatch({type : ALL_GUEST_FAIL,
        payload : error.response.data.message,
    });
    }
};

// Get Team For Admin
export const getAdminGuest= () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_GUEST_REQUEST });

    const { data } = await axios.get("/api/v1/admin/guest");

    dispatch({
      type: ADMIN_GUEST_SUCCESS,
      payload: data.guest,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Team
export const createGuest = (guestData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_GUEST_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/guest/new`,
      guestData,
      config
    );

    dispatch({
      type: NEW_GUEST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_GUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Team
export const updateGuest = (id, guestData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_GUEST_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/guest/update/${id}`,
      guestData,
      config
    );

    dispatch({
      type: UPDATE_GUEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_GUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Team
export const deleteGuest = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_GUEST_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/guest/delete/${id}`);

    dispatch({
      type: DELETE_GUEST_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_GUEST_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Get Guests Details
export const getGuestDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GUEST_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/guest/${id}`);

    dispatch({
      type: GUEST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GUEST_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Errors
export const clearErrors = ()=>async(dispatch)=>{
  dispatch({type : CLEAR_ERRORS})
  
}



