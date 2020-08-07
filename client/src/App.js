import React, { Component, useEffect, useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Layout/Navbar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/Routing/PrivateRoute";
import MovieList from "./components/Movies/MovieList";
import Landing from "./components/Layout/Landing";
import { loadUser } from "./actions/auth";
import { Provider } from "react-redux";
import store from "./store";
import SpinnerPage from "./components/Layout/SpinnerPage";
import Alert from "./components/Layout/Alert";
import MovieDetails from "./components/Movies/MovieDetails";
import Checkout from "./components/Cart/Checkout";
import TvShows from "./components/TvShows/TvShows";
import TvShowDetails from "./components/TvShows/TvShowDetails";
import { createBrowserHistory } from "history";


const history = createBrowserHistory();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ isLoading }) => {

  useEffect(() => {
    store.store.dispatch(loadUser());
  }, []);



  // if (isLoading) {
  //   return <SpinnerPage />
  // }

  return (
    <Router history={history}>
      <Alert />
      <div className="app-main">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path={"/movies"} component={MovieList} />
          <PrivateRoute exact path="/tv_shows" component={TvShows} />
          <PrivateRoute exact path="/movie_details" component={MovieDetails} />
          <PrivateRoute exact path="/show_details" component={TvShowDetails} />
          <PrivateRoute exact path="/cart" component={Cart} />
          <PrivateRoute path="/checkout" component={Checkout} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  // isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(App);
