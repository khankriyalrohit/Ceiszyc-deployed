import {
    CREATE_PARTICIPATION_REQUEST,
    CREATE_PARTICIPATION_SUCCESS,
    CREATE_PARTICIPATION_FAIL,
    MY_PARTICIPATIONS_REQUEST,
    MY_PARTICIPATIONS_SUCCESS,
    MY_PARTICIPATIONS_FAIL,
    ALL_PARTICIPATIONS_REQUEST,
    ALL_PARTICIPATIONS_SUCCESS,
    ALL_PARTICIPATIONS_FAIL,
    DELETE_PARTICIPATION_REQUEST,
    DELETE_PARTICIPATION_SUCCESS,
    DELETE_PARTICIPATION_FAIL,
    PARTICIPATION_DETAILS_REQUEST,
    PARTICIPATION_DETAILS_SUCCESS,
    PARTICIPATION_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/participationconstants";
  
  import axios from "axios";
  
  // Create Participation
  export const createParticipation = (participation) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_PARTICIPATION_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/participation/new", participation, config);
  
      dispatch({ type: CREATE_PARTICIPATION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CREATE_PARTICIPATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // My Participations
  export const myParticipations = () => async (dispatch) => {
    try {
      dispatch({ type: MY_PARTICIPATIONS_REQUEST });
  
      const { data } = await axios.get("/api/v1/participations/me");
  
      dispatch({ type: MY_PARTICIPATIONS_SUCCESS, payload: data.participations });
    } catch (error) {
      dispatch({
        type: MY_PARTICIPATIONS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get All Participations (admin)
  export const getAllParticipations = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_PARTICIPATIONS_REQUEST });
  
      const { data } = await axios.get("/api/v1/admin/participations");
  
      dispatch({ type: ALL_PARTICIPATIONS_SUCCESS, payload: data.participations });
    } catch (error) {
      dispatch({
        type: ALL_PARTICIPATIONS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete Participation
  export const deleteParticipation = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_PARTICIPATION_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/participation/${id}`);
  
      dispatch({ type: DELETE_PARTICIPATION_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: DELETE_PARTICIPATION_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Get Participation Details
  export const getParticipationDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: PARTICIPATION_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/v1/participation/${id}`);
  
      dispatch({ type: PARTICIPATION_DETAILS_SUCCESS, payload: data.participation });
    } catch (error) {
      dispatch({
        type: PARTICIPATION_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };