import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMovie, loadMovieDetail } from "../../actions/movie";
import { addToCart, loadCart } from "../../actions/cart";
import { MDBBtn, MDBIcon, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { loadMovieDetails, setMovie } from "../../actions/movie";
import Spinner from "../Spinner/Spinner";
import MovieThumb from "../MovieThumb/MovieThumb";
import {
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from "../../config";
import Show from "./Show";

const TvShowDetails = ({
  movie,
  addToCart,
  isLoading,
  loadMovieDetails,
  getMovie,
  loadCart,
  tvShow,
}) => {
  useEffect(() => {
    loadCart();
    console.log("❌", tvShow);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  let tvShowDetails = (
    <MDBContainer>
      <MDBRow>
        <div
          // className="movie-details-container"
          style={{
            // background: tvShow.backdrop_path
            //   ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${tvShow.backdrop_path}')`
            //   : "#000",
            marginTop: "50px",
          }}
        >
          <MovieThumb
            image={
              tvShow.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${tvShow.poster_path}`
                : "./images/no_image.jpg"
            }
            clickable={false}
          />
        </div>
      </MDBRow>
      <MDBCol>
        <div style={{ margin: "20px"}}>
          <h1>{tvShow.name}</h1>
          <MDBBtn onClick={() => addToCart(tvShow)}>
            Add To Cart <MDBIcon icon="cart-plus" />
          </MDBBtn>
        </div>
        <h3>PLOT</h3>
        <p>{tvShow.overview}</p>
        <h3>IMDB RATING</h3>

        <meter
          min="0"
          max="100"
          optimum="100"
          low="40"
          high="70"
          value={tvShow.vote_average * 10}
        />
        <p className="rmdb-score">{tvShow.vote_average}</p>
      </MDBCol>
    </MDBContainer>
  );

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right,
    rgba(19, 38, 47, 0.925) 0%,
    rgba(9, 28, 37, 0.925) 100%), url(https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {tvShowDetails}
    </div>
  );
};

const mapStateToProps = (state) => ({
  tvShow: state.movie.searchedShow,
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, {
  addToCart,
  loadMovieDetails,
  getMovie,
  loadCart,
})(TvShowDetails);
