import React, { Component, useEffect, useState } from "react";
import config from "../../config.json";
import PropTypes from "prop-types";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, loadCart, getCart } from "../../actions/cart";
import { getMovie, setMovie, clearCache, getRelatedMovies } from "../../actions/movie";
import { fetchMovies } from "../../actions/movie";
import { connect } from "react-redux";
import Movie from "./Movie";
import SearchPage from "../Search/Search";
import { MDBContainer, MDBRow, MDBCol, MDBView } from "mdbreact";
import "../../App.css";
import axios from "axios";
import { SET_MOVIES } from "../../actions/types";



const MovieList = ({
  addToCart,
  loadCart,
  getCart,
  userId,
  setMovie,
  isLoading,
  movies,
  getRelatedMovies
}) => {

  const [movie, setMovies] = useState([]);


  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${config.API_KEY}&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(data => {
        getRelatedMovies()
        setMovie(data.results);
        setMovies([...movie, data.results]);
        loadCart();
      });
  }, []);

  

  if (isLoading) {
    return <SpinnerPage />;
  }

  return (
    <div>
      <SearchPage />
      <MDBContainer>
        <MDBRow>
          {movies.map((movie, key) => {
            return (
              <MDBCol key={key} size="6">
                <div className="hover-movie">
                  <Movie
                    id={movie.id}
                    addToCart={addToCart}
                    title={movie.title}
                    image={movie.poster_path}
                    overview={movie.overview}
                    movieObj={movie}
                    price={2.99}
                  />
                </div>
              </MDBCol>
            );
          })}
        </MDBRow>
      </MDBContainer>

      <div style={{ padding: '100px' }}>New Comp</div>
    </div>
  );
};

MovieList.propTypes = {
  addToCart: PropTypes.func.isRequired,
  loadCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  userId: state.auth.userInfo._id,
  isLoading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  movies: state.movie.movies,
});

export default connect(mapStateToProps, {
  addToCart,
  loadCart,
  getCart,
  setMovie,
  getRelatedMovies
})(MovieList);
