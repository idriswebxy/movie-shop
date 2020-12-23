import React, { Component, useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Layout/Navbar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Routing/PrivateRoute";
import MovieList from "./components/Movies/MovieList";
import Landing from "./components/Layout/Landing";
import { loadUser } from "./actions/auth";
import store from "./store";
import Alert from "./components/Layout/Alert";
import MovieDetails from "./components/Movies/MovieDetails";
import Checkout from "./components/Cart/Checkout";
import TvShows from "./components/TvShows/TvShows";
import TvShowDetails from "./components/TvShows/TvShowDetails";
import { googleAuth } from "./actions/auth";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "./components/Spinner/Spinner";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({}) => {
  const {
    user,
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      store.store.dispatch(auth0_loadUser());
    } else {
      store.store.dispatch(loadUser());
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="app-main">
      <Router history={history}>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute
            exact
            path="/movies"
            store={store}
            component={MovieList}
          />
          <PrivateRoute path="/tv_shows" component={TvShows} />
          <PrivateRoute path="/movieInfo/:id" component={MovieDetails} />
          <PrivateRoute path="/show_details" component={TvShowDetails} />
          <PrivateRoute path="/cart" component={Cart} />
          <PrivateRoute path="/checkout" component={Checkout} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(App);
