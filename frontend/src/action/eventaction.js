import axios from 'axios';

import { 
    ALL_EVENT_FAIL,
    ALL_EVENT_REQUEST,
    ALL_EVENT_SUCCESS, 
    ADMIN_EVENT_REQUEST,
    ADMIN_EVENT_SUCCESS,
    ADMIN_EVENT_FAIL,
    NEW_EVENT_REQUEST,
    NEW_EVENT_SUCCESS,
    NEW_EVENT_FAIL,
    NEW_EVENT_RESET,
    UPDATE_EVENT_REQUEST,
    UPDATE_EVENT_SUCCESS,
    UPDATE_EVENT_FAIL,
    DELETE_EVENT_REQUEST,
    DELETE_EVENT_SUCCESS,
    DELETE_EVENT_FAIL,
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
    EVENT_DETAILS_FAIL,
    CLEAR_ERRORS,} from "../constants/eventconstants.js";

export const getEvent = (keyword = " ",category)=>async(dispatch)=>{
    try{
      dispatch({type : ALL_EVENT_REQUEST});
      let link = `/api/v1/events` ;
    if(category)
    {
      let link = `/api/v1/events?keyword=${keyword}&category=${category}` ;
    }
      const { data }  = await axios.get(link);
      dispatch({
      type : ALL_EVENT_SUCCESS,
      payload :data,
    })
    } catch(error) {
      dispatch({type : ALL_EVENT_FAIL,
        payload : error.response.data.message,
    });
    }
};

// Get All Products For Admin
export const getAdminEvent = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EVENT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/events");

    dispatch({
      type: ADMIN_EVENT_SUCCESS,
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create Product
export const createEvent = (eventData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/event/new`,
      eventData,
      config
    );

    dispatch({
      type: NEW_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateEvent = (id, eventData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/events/${id}`,
      eventData,
      config
    );

    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/events/${id}`);

    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};


// Get Events Details
export const getEventDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EVENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/event/${id}`);

    dispatch({
      type: EVENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EVENT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear Errors
export const clearErrors = ()=>async(dispatch)=>{
    dispatch({type : CLEAR_ERRORS})
    
}
