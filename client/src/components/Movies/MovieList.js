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
  setMoviesDB,
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
  MDBNavLink,
  MDBBtn,
} from "mdbreact";
import RelatedMovies from "./RelatedMovies";
import "../../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getCurrentProfile, getProfileById } from "../../actions/profile";
import { useParams, useHistory, useRouteMatch, Link, Redirect, useLocation } from "react-router-dom";
import movie from "../../reducers/movie";

const MovieList = ({
  addToCart,
  loadCart,
  isLoading,
  movies,
  fetchApi,
  page,
  nextPage,
  prevPage,
  dispatch,
  getCurrentProfile,
  getProfileById,
  userId,
}) => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const history = useHistory();
  
  
  useEffect(() => {
    fetchApi(config.API_KEY, page);
    loadCart();
    // getAccessTokenSilently().then(token => localStorage.setItem("token", token))
    getProfileById(userId)
    // loadMore(true);
    
    history.push(`${page}`)
  }, [page]);


  let load = (
    <div>
      <SpinnerPage />
    </div>
  );


  // page transition
  let pages = (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <MDBBtn
          // to={`/movies/${page}`}
          onClick={() => prevPage(page)}
          className="page-item"
        >
          <MDBIcon
            className="white-text pr-3"
            size="2x"
            icon="angle-double-left"
          />
        </MDBBtn>
        &nbsp; &nbsp; &nbsp; Page: {page} &nbsp; &nbsp; &nbsp;
        &nbsp;
        <MDBBtn
          onClick={() => nextPage(page)}
          className="page-item"
        >
          <MDBIcon
            className="white-text pr-3"
            size="2x"
            icon="angle-double-right"
          />
        </MDBBtn>
      </ul>
    </nav>
  );



  const movieList = (
    <MDBRow>
      {movies.map((movie, key) => {
        return (
          <MDBCol size="6" lg="3">
            <MDBAnimation type="zoomIn" duration="1s">
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
            </MDBAnimation>
          </MDBCol>
        );
      })}
    </MDBRow>
  );

  return (
    <div className="movie-list">
      <MDBContainer>
        <SearchPage />
        <div className="pagination">{pages}</div>
        {isLoading ? load : movieList}
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
  fetchApi,
  nextPage,
  prevPage,
  getProfileById
})(MovieList);
