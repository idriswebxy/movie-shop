import React, { Component, useEffect, useState } from "react";
import config from "../../config.json";
import PropTypes from "prop-types";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, loadCart, getCart } from "../../actions/cart";
import {
  getMovie,
  setMovies,
  clearCache,
  getMovieVideo,
  fetchApi,
  nextPage,
  prevPage,
  setRelatedMovies,
} from "../../actions/movie";
import { connect } from "react-redux";
import Movie from "./Movie";
import SearchPage from "../Search/Search";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBView,
  MDBIcon,
  MDBAnimation,
} from "mdbreact";
import RelatedMovies from "./RelatedMovies";
import "../../App.css";

const MovieList = ({
  addToCart,
  loadCart,
  getCart,
  userId,
  setMovies,
  isLoading,
  movies,
  relatedMovies,
  // getMovieVideo,
  fetchApi,
  page,
  nextPage,
  prevPage,
  authenticated,
  searchedMovie,
}) => {
  useEffect(() => {
    fetchApi(config.API_KEY, page);
    loadCart();
  }, [page]);


  if (isLoading) {
    return <SpinnerPage />;
  }

  // page transition
  let pages = (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li onClick={() => prevPage(page)} className="page-item">
          <MDBIcon
            className="white-text pr-3"
            size="2x"
            icon="angle-double-left"
          />
        </li>
        &nbsp; &nbsp; &nbsp; Page: {page} &nbsp; &nbsp; &nbsp; &nbsp;
        <li onClick={() => nextPage(page)} className="page-item">
          <MDBIcon
            className="white-text pr-3"
            size="2x"
            icon="angle-double-right"
          />
        </li>
      </ul>
    </nav>
  );

  const movieList = (
    <MDBAnimation type="zoomIn" duration="1s">
      <MDBRow>
        {movies.map((movie, key) => {
          return (
            <MDBCol key={key} size="3">
              <div className="hover-movie">
                <Movie
                  id={movie.id}
                  addToCart={addToCart}
                  title={movie.title}
                  image={movie.poster_path}
                  overview={movie.overview}
                  releaseDate={movie.release_date}
                  price={2.99}
                  movieObj={movie}
                />
              </div>
            </MDBCol>
          );
        })}
      </MDBRow>
    </MDBAnimation>
  );

  return (
    <div className="movie-list">
      <MDBContainer>
        <SearchPage />
        <div className="pagination">{pages}</div>
        {movieList}
        <div className="pagination">{pages}</div>
      </MDBContainer>
      <RelatedMovies />
    </div>
  );
};

MovieList.propTypes = {
  addToCart: PropTypes.func.isRequired,
  loadCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userId: state.auth.userInfo._id,
  isLoading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  movies: state.movie.movies,
  page: state.movie.page,
  searchedMovie: state.movie.searchedMovie,
});

export default connect(mapStateToProps, {
  addToCart,
  loadCart,
  getCart,
  setMovies,
  // getMovieVideo,
  fetchApi,
  nextPage,
  prevPage,
})(MovieList);
