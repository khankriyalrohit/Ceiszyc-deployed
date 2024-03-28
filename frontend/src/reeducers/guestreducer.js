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
    UPDATE_GUEST_RESET,
    DELETE_GUEST_REQUEST,
    DELETE_GUEST_SUCCESS,
    DELETE_GUEST_FAIL,
    DELETE_GUEST_RESET,
    GUEST_DETAILS_REQUEST,
    GUEST_DETAILS_SUCCESS,
    GUEST_DETAILS_FAIL,
    CLEAR_ERRORS,} from "../constants/guestconstants"

export const guestReducer = (state={guest:[]},action)=>{
    switch (action.type) {
        case ALL_GUEST_REQUEST:
        case ADMIN_GUEST_REQUEST:
            return{
                loading:true,
                guest : [],
            }
        case ALL_GUEST_SUCCESS:
            return{
                loading:false,
                guest : action.payload.guest,
                guestCount : action.payload.guestCount,          
            }
        case ADMIN_GUEST_SUCCESS:
              return {
                loading: false,
                guest: action.payload,
              };

        case ALL_GUEST_FAIL:
        case ADMIN_GUEST_FAIL:
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


  export const newguestReducer = (state = { guest: {} }, action) => {
    switch (action.type) {
      case NEW_GUEST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_GUEST_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          guest: action.payload.guest,
        };
      case NEW_GUEST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_GUEST_RESET:
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

  export const singleguestReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_GUEST_REQUEST:
      case UPDATE_GUEST_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_GUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_GUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_GUEST_FAIL:
      case UPDATE_GUEST_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_GUEST_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_GUEST_RESET:
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

  export const guestDetailsReducer = (state = { guest:{} }, action) => {
    switch (action.type) {
      case GUEST_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case GUEST_DETAILS_SUCCESS:
        return {
          loading: false,
          guest: action.payload.guest,
        };
      case GUEST_DETAILS_FAIL:
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