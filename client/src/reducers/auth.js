import {
  USER_LOADED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  ACCOUNT_DELETED,
  LOGIN_FAIL
} from "../actions/types";
 

const initialState = {
  token: localStorage.getItem("token"),
  authenticated: null,
  loading: true,
  user: {},
};

export default function(state = initialState, action) {
  
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        authenticated: true,
        loading: false
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        authenticated: false,
        loading: false
      };

    default:
      return state;
  }
}
