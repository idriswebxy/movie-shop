import React, { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import MainImage from "../MainImage/MainImage";
import FourColGrid from "../FourColGrid/FourColGrid";
import MovieThumb from "../MovieThumb/MovieThumb";
import { addToCart, loadCart } from "../../actions/cart";
import {
  fetchItems,
  nextPage,
  prevPage,
  // loadMore,
  loadMovies,
  loadChange,
  loadMoreItems,
} from "../../actions/movie";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
} from "../../config";
import "./MovieList.css";
import { connect } from "react-redux";
import Movie from "./Movie";
import SearchPage from "../Search/Search";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "../../App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

const MovieList = ({
  addToCart,
  loadCart,
  isLoading,
  movies,
  loadMore,
  fetchItems,
  page,
  totalPages,
  loadChange,
  nextPage,
  loadMovies,
  loadMoreItems,
}) => {
  // let [currentPage, setCurrentPage] = useState(1);

  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const history = useHistory();

  let endpoint = ""

  useEffect(() => {
    if (movies.length <= 20) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchItems(endpoint);
      loadCart();
    } else {
      loadCart()
    }
  }, []);



  return (
    <div className="rmdb-home">
      <div className="rmdb-home-grid">
        <FourColGrid
          // header={searchTerm ? "Search Result" : "Popular Movies"}
          loading={isLoading}
        >
          {movies.map((movie, index) => {
            return (
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
            );
          })}
        </FourColGrid>
        {isLoading ? <Spinner /> : null}
        {page <= totalPages && !isLoading ? (
          <LoadMoreBtn
            text="Load More"
            onClick={() => loadMoreItems(endpoint, page)}
          />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.userInfo._id,
  isLoading: state.movie.isLoading,
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
  // loadMore,
  loadMovies,
  fetchItems,
  loadChange,
  loadMoreItems,
})(MovieList);
