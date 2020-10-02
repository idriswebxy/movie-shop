import React, { useEffect, useState } from "react";
import config from "../../config.json";
import PropTypes from "prop-types";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, loadCart } from "../../actions/cart";
import {
  setMovies,
  fetchApi,
  nextPage,
  prevPage,
  loadMore,
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
  MDBBtn,
} from "mdbreact";
import RelatedMovies from "./RelatedMovies";
import "../../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

const MovieList = ({
  addToCart,
  loadCart,
  isLoading,
  movies,
  fetchApi,
  page,
  nextPage,
  prevPage,
  userId,
  loadMore,
}) => {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const history = useHistory();

  useEffect(() => {
    // fetchApi(config.API_KEY);
    loadMore(null, config.API_KEY, page)
    loadCart(movies, config.API_KEY, page);
  }, []);

  let load = (
    <div>
      <SpinnerPage />
    </div>
  );

  const movieList = (
    <MDBRow>
      {movies.map((movie, index) => {
        return (
          <MDBCol middle="true" size="3">
            <Movie
              index={index}
              id={movie.id}
              addToCart={addToCart}
              title={movie.title}
              image={movie.poster_path}
              overview={movie.overview}
              releaseDate={movie.release_date}
              price={2.99}
              movieObj={movie}
            />
          </MDBCol>
        );
      })}
    </MDBRow>
  );

  return (
    <MDBContainer>
      <SearchPage />
      <MDBContainer>
        {isLoading ? load : movieList}{" "}
        {
          <MDBBtn onClick={() => loadMore(movies, config.API_KEY, page)}>
            Load More
          </MDBBtn>
        }
      </MDBContainer>

      <RelatedMovies />
    </MDBContainer>
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
  page: state.movie.moviePage,
  searchedMovie: state.movie.searchedMovie,
});

export default connect(mapStateToProps, {
  addToCart,
  loadCart,
  setMovies,
  fetchApi,
  nextPage,
  prevPage,
  loadMore,
})(MovieList);
