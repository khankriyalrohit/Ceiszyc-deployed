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
    UPDATE_SPONSOR_RESET,
    DELETE_SPONSOR_REQUEST,
    DELETE_SPONSOR_SUCCESS,
    DELETE_SPONSOR_FAIL,
    DELETE_SPONSOR_RESET,
    SPONSOR_DETAILS_REQUEST,
    SPONSOR_DETAILS_SUCCESS,
    SPONSOR_DETAILS_FAIL,
    CLEAR_ERRORS,} from "../constants/sponsorconstants"

export const sponsorReducer = (state={sponsor:[]},action)=>{
    switch (action.type) {
        case ALL_SPONSOR_REQUEST:
        case ADMIN_SPONSOR_REQUEST:
            return{
                loading:true,
                sponsor : [],
            }
        case ALL_SPONSOR_SUCCESS:
            return{
                loading:false,
                sponsor : action.payload.sponsor,
                sponsorCount : action.payload.sponsorCount,          
            }
        case ADMIN_SPONSOR_SUCCESS:
              return {
                loading: false,
                sponsor: action.payload,
              };

        case ALL_SPONSOR_FAIL:
        case ADMIN_SPONSOR_FAIL:
            return{
                loading:true,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error: null,
            }        
        default:
           return state;
    }

}


  export const newsponsorReducer = (state = { sponsor: {} }, action) => {
    switch (action.type) {
      case NEW_SPONSOR_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_SPONSOR_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          sponsor: action.payload.sponsor,
        };
      case NEW_SPONSOR_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_SPONSOR_RESET:
        return {
          ...state,
          success: false,
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

  export const singlesponsorReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_SPONSOR_REQUEST:
      case UPDATE_SPONSOR_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_SPONSOR_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_SPONSOR_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_SPONSOR_FAIL:
      case UPDATE_SPONSOR_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_SPONSOR_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_SPONSOR_RESET:
        return {
          ...state,
          isUpdated: false,
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

  export const sponsorDetailsReducer = (state = { sponsor:{} }, action) => {
    switch (action.type) {
      case SPONSOR_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case SPONSOR_DETAILS_SUCCESS:
        return {
          loading: false,
          sponsor: action.payload.sponsor,
        };
      case SPONSOR_DETAILS_FAIL:
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