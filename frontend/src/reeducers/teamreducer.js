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
    UPDATE_TEAM_RESET,
    DELETE_TEAM_REQUEST,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FAIL,
    DELETE_TEAM_RESET,
    TEAM_DETAILS_REQUEST,
    TEAM_DETAILS_SUCCESS,
    TEAM_DETAILS_FAIL,
    CLEAR_ERRORS,} from "../constants/teamconstants"

export const teamReducer = (state={team:[]},action)=>{
    switch (action.type) {
        case ALL_TEAM_REQUEST:
        case ADMIN_TEAM_REQUEST:
            return{
                loading:true,
                team : [],
            }
        case ALL_TEAM_SUCCESS:
            return{
                loading:false,
                team : action.payload.team,
                teamCount : action.payload.teamCount,          
            }
        case ADMIN_TEAM_SUCCESS:
              return {
                loading: false,
                team: action.payload,
              };

        case ALL_TEAM_FAIL:
        case ADMIN_TEAM_FAIL:
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


  export const newteamReducer = (state = { team: {} }, action) => {
    switch (action.type) {
      case NEW_TEAM_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_TEAM_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          team: action.payload.team,
        };
      case NEW_TEAM_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_TEAM_RESET:
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

  export const singleteamReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_TEAM_REQUEST:
      case UPDATE_TEAM_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_TEAM_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_TEAM_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_TEAM_FAIL:
      case UPDATE_TEAM_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_TEAM_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_TEAM_RESET:
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

  export const teamDetailsReducer = (state = { team:{} }, action) => {
    switch (action.type) {
      case TEAM_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case TEAM_DETAILS_SUCCESS:
        return {
          loading: false,
          team: action.payload.team,
        };
      case TEAM_DETAILS_FAIL:
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