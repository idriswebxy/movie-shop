import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
import {
  USER_LOADED,
  AUTH_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  CLEAR_PROFILE,
  LOGOUT,
  LOGIN_SUCCESS
} from "./types";



// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/user");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};



// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  console.log(body)

  try {
    const res  = await axios.post("/api/user", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};



// Login User
export const login = (email, password) => async dispatch => {

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  

  const body = JSON.stringify({ email, password });

  console.log(body)


  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  
    
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};





// export const guestLogin = (email, password) => async dispatch => {


//   const config = {
//     headers: {
//       "Content-Type": "application/json"
//     }
//   };

//   let email = process.env.REACT_APP_GUEST_EMAIL
//   let passwd = process.env.REACT_APP_GUEST_PASSWD

//   const body = JSON.stringify({ email, passwd });


//   try {
//     const res = await axios.post("/api/auth", body, config);

//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: res.data
//     });

//     dispatch(loadUser());
  
    
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
//     }

//     dispatch({
//       type: LOGIN_FAIL
//     });
//   }
// };


// Logout
export const logOut = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
