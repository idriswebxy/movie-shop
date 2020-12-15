import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "tachyons";
import "./App.css";
import store from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./utils/history";
import {
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_AUDIENCE,
  REACT_APP_AUTH0_CALLBACK_URI
} from "./config";

const domain = REACT_APP_AUTH0_DOMAIN;
const clientId = REACT_APP_AUTH0_CLIENT_ID;
const audience = REACT_APP_AUTH0_AUDIENCE;
const callbackUri = REACT_APP_AUTH0_CALLBACK_URI;


const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate persistor={store.persistor}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        audience={audience}
        redirectUri={callbackUri}
        onRedirectCallback={onRedirectCallback}
      >
        <App />
      </Auth0Provider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
