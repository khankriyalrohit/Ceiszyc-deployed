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
    DELETE_PARTICIPATION_RESET,
    PARTICIPATION_DETAILS_REQUEST,
    PARTICIPATION_DETAILS_SUCCESS,
    PARTICIPATION_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/participationconstants";
  
  export const newParticipationReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_PARTICIPATION_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case CREATE_PARTICIPATION_SUCCESS:
        return {
          loading: false,
          participation: action.payload,
        };
  
      case CREATE_PARTICIPATION_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const myParticipationsReducer = (state = { participations: [] }, action) => {
    switch (action.type) {
      case MY_PARTICIPATIONS_REQUEST:
        return {
          loading: true,
        };
  
      case MY_PARTICIPATIONS_SUCCESS:
        return {
          loading: false,
          participations: action.payload,
        };
  
      case MY_PARTICIPATIONS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const allParticipationsReducer = (state = { participations: [] }, action) => {
    switch (action.type) {
      case ALL_PARTICIPATIONS_REQUEST:
        return {
          loading: true,
        };
  
      case ALL_PARTICIPATIONS_SUCCESS:
        return {
          loading: false,
          participations: action.payload,
        };
  
      case ALL_PARTICIPATIONS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const participationReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_PARTICIPATION_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case DELETE_PARTICIPATION_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case DELETE_PARTICIPATION_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      case DELETE_PARTICIPATION_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export const participationDetailsReducer = (state = { participation: {} }, action) => {
    switch (action.type) {
      case  PARTICIPATION_DETAILS_REQUEST:
        return {
          loading: true,
        };
  
      case  PARTICIPATION_DETAILS_SUCCESS:
        return {
          loading: false,
          participation: action.payload,
        };
  
      case  PARTICIPATION_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };