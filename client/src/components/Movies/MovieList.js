import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import LoadMoreBtn from "../../LoadMoreBtn/LoadMoreBtn";
import { addToCart, loadCart } from "../../actions/cart";
import {
  fetchItems,
  nextPage,
  prevPage,
  loadMovies,
  loadChange,
  loadMoreItems,
} from "../../actions/movie";
import axios from "axios";
import { API_URL, API_KEY } from "../../config";
import "./MovieList.css";
import { connect } from "react-redux";
import Movie from "./Movie";
import SearchBar from "../Search/Search";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "../../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { googleAuth } from "../../actions/auth";
import setAuthToken from "../../utils/setAuthToken";
import { REACT_APP_SERVER_URL } from "../../config";

const MovieList = ({
  addToCart,
  loadCart,
  loading,
  movies,
  fetchItems,
  page,
  totalPages,
  loadMoreItems,
  googleAuth,
}) => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  let endpoint = "";
  const serverUrl = REACT_APP_SERVER_URL;

  useEffect(() => {
    if (movies.length <= 20) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchItems(endpoint);
      loadCart();
      // callSecureApi();
      // googleAuth()
    } else {
      loadCart();
    }
  }, []);

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log("TOKEN ==> " + token);

      const res = await fetch(`${serverUrl}/api/auth/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await res.json();
      console.log("RES ==> " + responseData);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (isLoading || loading) {
    return <Spinner />;
  }

  const movieList = (
    <MDBContainer>
      <div className="rmdb-home">
        <div className="rmdb-home-grid">
          <MDBRow>
            {movies.map((movie, index) => {
              return (
                <MDBCol md="3">
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
          {loading || isLoading ? <Spinner /> : null}
          {page <= totalPages && (!isLoading || loading) ? (
            <LoadMoreBtn
              text="Load More"
              onClick={() => loadMoreItems(endpoint, page)}
            />
          ) : null}
        </div>
      </div>
    </MDBContainer>
  );

  return (
    <div>
      <SearchBar />
      {movieList}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  movies: state.movie.movies,
  page: state.movie.moviePage,
  searchedMovie: state.movie.searchedMovie,
  totalPages: state.movie.totalPages,
});

export default connect(mapStateToProps, {
  addToCart,
  loadCart,
  nextPage,
  prevPage,
  loadMovies,
  fetchItems,
  loadChange,
  loadMoreItems,
  googleAuth,
})(MovieList);
