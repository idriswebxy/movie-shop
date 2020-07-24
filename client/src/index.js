import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "tachyons";
import "./App.css";
import store from "./store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Provider store={store.store}>
    <PersistGate persistor={store.persistor}>
      <Auth0Provider
        domain="square-unit-4148.us.auth0.com"
        clientId="gapUUawQ7TPSHlULSmROdZ55SUesnuMA"
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
