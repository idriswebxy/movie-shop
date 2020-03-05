import React, { Component, useEffect, useState } from "react";
import { API_KEY } from "../../config/config";
import PropTypes from "prop-types";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, loadCart, getCart } from "../../actions/cart";
import { getMovie, setMovie, clearCache } from "../../actions/movie";
import { useAuth0 } from "../../react-auth0-spa";
import { fetchMovies } from "../../actions/movie";
import { connect } from "react-redux";
import Movie from "./Movie";
import SearchPage from "../Search/Search";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBNavLink
} from "mdbreact";
import "../../App.css";
import axios from "axios";
import { SET_MOVIES } from "../../actions/types";

const MovieList = ({
  addToCart,
  loadCart,
  getCart,
  userId,
  setMovie,
  isLoading
}) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // fetchMovies().then(data => {
    //   setMovies(...movies, data.results);
    //   setMovie(data.results);
    //   loadCart();
    // });

    // var config = {
    //   headers: {'Access-Control-Allow-Origin': '*'}
    // };
    // var proxy = {
    //   host: '104.236.174.88',
    //   port: 3128
    // }
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(data => {
        setMovie(data.results);
        setMovies(...movies, data.results);
        loadCart();
      });
  }, []);

  // if (isLoading) {
  //   return <SpinnerPage />;
  // }
  

  return (
    <div>
      <SearchPage />
      <MDBContainer>
        <MDBRow>
          {movies.map((movie, key) => {
            return (
              <MDBCol sm="3">
                <div key={key}>
                  <Movie
                    id={movie.id}
                    addToCart={addToCart}
                    title={movie.title}
                    image={movie.poster_path}
                    overview={movie.overview}
                    movieObj={movie}
                  />
                </div>
              </MDBCol>
            );
          })}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

MovieList.propTypes = {
  addToCart: PropTypes.func.isRequired,
  loadCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.user._id,
  isLoading: state.movie.isLoading,
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, {
  addToCart,
  loadCart,
  getCart,
  setMovie
})(MovieList);
