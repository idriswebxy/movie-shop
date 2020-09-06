import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import alert from "./alert";
import auth from "./auth";
import cart from "./cart";
import movie from "./movie";



const persistConfig = {
  key: "root",
  storage,
  whiteList: [alert, auth, cart, movie]
}

const rootReducer = combineReducers({
  alert,
  auth,
  cart,
  movie,
});

export default persistReducer(persistConfig, rootReducer);
