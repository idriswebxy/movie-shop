import {
  USER_LOADED,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  ACCOUNT_DELETED,
  LOGIN_FAIL,
  CLEAR_PROFILE,
  GOOGLE_AUTH
} from "../actions/types";

const initialState = {
  googleAuth: false,
  googleUser: {},
  token: localStorage.getItem("token"),
  authenticated: null,
  isLoading: true,
  userInfo: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        authenticated: true,
        isLoading: false,
        userInfo: payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        authenticated: true,
        isLoading: false,
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
        isLoading: true,  //TODO: temp test state
      };
    case GOOGLE_AUTH:
      localStorage.setItem("auth0_token", payload.token)
      return {
        ...state,
        userInfo: payload.user,
        authenticated: true,
        isLoading: false
      };
    default:
      return state;
  }
}
