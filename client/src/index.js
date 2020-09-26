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
import config from "./auth0.config.json";
import history from "./utils/history";



const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};


ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate persistor={store.persistor}>
      <Auth0Provider
        domain={config.domain}
        clientId={config.clientId}
        audience={config.audience}
        redirectUri={config.redirectUri}
        onRedirectCallback={onRedirectCallback}
      >
        <App />
      </Auth0Provider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
