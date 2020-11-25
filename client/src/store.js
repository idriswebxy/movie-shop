import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const middlewares = [thunk, logger];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

const persistor = persistStore(store);

export default { store, persistor };
persistor.purge();


