import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SpinnerPage from "../Layout/SpinnerPage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import MainImage from "../MainImage/MainImage";
import FourColGrid from "../FourColGrid/FourColGrid";
import MovieThumb from "../MovieThumb/MovieThumb";
import { addToCart, loadCart } from "../../actions/cart";
import {
  fetchItems,
  nextPage,
  prevPage,
  loadMore,
  loadMovies,
} from "../../actions/movie";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  POSTER_SIZE,
  BACKDROP_SIZE,
} from "../../config";

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
  // movies,
  loadMore,
  fetchItems,
}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [mainImage, setMainImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    let endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchItems(endpoint);
    loadCart();
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const loadMoreItems = () => {
    let endpoint = "";
    setLoading({
      loading: true,
    });

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query${searchTerm}$page=${
        currentPage + 1
      }`;
    }
    fetchItems(endpoint);
  };

  const searchItems = (searchTerm) => {
    console.log(searchTerm);
    let endpoint = "";

    setMovies([]);
    setLoading(true);
    setSearchTerm(searchTerm);

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  };

  let load = (
    <div>
      <SpinnerPage />
    </div>
  );

  let loadMoreBtn = (
    <div>
      <MDBBtn onClick={() => loadMore()}>Load More</MDBBtn>
    </div>
  );

  // const movieList = (
  //   <MDBRow>
  //     {movies.map((movie, index) => {
  //       return (
  //         <MDBCol middle="true" size="3">
  //           <Movie
  //             index={index}
  //             id={movie.id}
  //             addToCart={addToCart}
  //             title={movie.title}
  //             image={movie.poster_path}
  //             overview={movie.overview}
  //             releaseDate={movie.release_date}
  //             price={2.99}
  //             movieObj={movie}
  //           />
  //         </MDBCol>
  //       );
  //     })}
  //   </MDBRow>
  // );

  return (
    <div className="rmdb-home">
      {mainImage ? (
        <div>
          <MainImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${mainImage.backdrop_path}`}
            title={mainImage.original_title}
            text={mainImage.overview}
          />
          <SearchPage callback={() => searchItems()} />
        </div>
      ) : null}
      <div className="rmdb-home-grid">
        <FourColGrid
          header={searchTerm ? "Search Result" : "Popular Movies"}
          loading={loading}
        >
          {movies.map((element, i) => {
            return (
              <MovieThumb
                key={i}
                clickable={true}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}/${element.poster_path}`
                    : "./images/no_image.jpg"
                }
                movieId={element.id}
                movieName={element.original_title}
              />
            );
          })}
        </FourColGrid>
        {loading ? <SpinnerPage /> : null}
        {currentPage <= totalPages && !loading ? (
          <LoadMoreBtn text="Load More" onClick={() => loadMoreItems()} />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.userInfo._id,
  isLoading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  // movies: state.movie.movies,
  page: state.movie.moviePage,
  searchedMovie: state.movie.searchedMovie,
});

export default connect(mapStateToProps, {
  addToCart,
  loadCart,
  nextPage,
  prevPage,
  loadMore,
  loadMovies,
  fetchItems,
})(MovieList);
