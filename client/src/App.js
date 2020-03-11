import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Layout/Navbar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Routing/PrivateRoute";
import MovieList from "./components/Movies/MovieList";
import { useAuth0 } from "./react-auth0-spa";
import Landing from "./components/Layout/Landing";
import { loadUser } from "./actions/auth";
import { Provider } from "react-redux";
import store from "./store";
import SpinnerPage from "./components/Layout/SpinnerPage";
import history from "./utils/history";
import Alert from "./components/Layout/Alert";
import MovieDetails from "./components/Movies/MovieDetails";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  // const { isAuthenticated } = useAuth0();


  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // if (isAuthenticated) {
  //   return <Redirect to="/movies" />;
  // }

  return (
    <Provider store={store}>
      <Router history={history}>
        <Alert />
        <div
          style={{
            boxSizing: "border-box",
            background: "rgb(9, 28, 37)",
            color: "white"
          }}
        >
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/movies" component={MovieList} />
            <PrivateRoute
              exact
              path="/movie_details"
              component={MovieDetails}
            />
            <PrivateRoute exact path="/cart" component={Cart} />
          </Switch>

          {/* <Footer /> */}
        </div>
      </Router>
    </Provider>
  );
};

export default App;
