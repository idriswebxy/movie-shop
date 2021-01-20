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

const App = ({ authenticated }) => {
  const {
    user,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  // const loadAuthData = async () => {
  //   try {
  //     const token = await getAccessTokenSilently().then((t) => console.log(t));
  //     console.log(token);
  //     setAuthToken(token);
  //     return token;
  //   } catch (error) {
  //     console.error("GoogleAuthFunc => " + error.message);
  //   }
  // };

  useEffect(() => {
    store.store.dispatch(loadUser());
    // loadAuthData()
  }, []);


  // useEffect(() => {
  //   try {
  //     (async () => {
  //       const token = await getAccessTokenSilently();
  //       console.log(token);
  //     })();
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [getAccessTokenSilently]);

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
          <PrivateRoute exact path="/movies" component={MovieList} />
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

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(App);
