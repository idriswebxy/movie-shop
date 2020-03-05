import { combineReducers } from 'redux';
import alert from "./alert";
import auth from "./auth";
import cart from "./cart";  
import movie from "./movie";


export default combineReducers({
  alert,
  auth,
  cart,
  movie
})
