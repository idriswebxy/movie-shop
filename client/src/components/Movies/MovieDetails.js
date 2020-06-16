import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMovie, loadMovieDetail, getMovieVideo } from "../../actions/movie";
import { addToCart, loadCart } from "../../actions/cart";
import { MDBBtn, MDBIcon, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { loadMovieDetails, setMovie } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";
import StarRatings from "react-star-ratings";
import ReactPlayer from "react-player/youtube";

const MovieDetails = ({
  movie,
  addToCart,
  isLoading,
  loadMovieDetails,
  getMovie,
  loadCart,
  isLoading_app,
  voteAverage,
  // getMovieVideo,
  videoKey,
}) => {
  useEffect(() => {
    loadCart();
    // getMovieVideo();
  }, []);

  if (isLoading) {
    return <SpinnerPage />;
  }

  let movieDetails = (
    <div
      style={{
        backgroundImage: `linear-gradient(to right,
        rgba(19, 38, 47, 0.925) 0%,
        rgba(9, 28, 37, 0.925) 100%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: "186px",
      }}
    >
      <MDBContainer>
        <MDBRow>
          <MDBCol size="4">
            <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />{" "}
            <MDBCol className="movie-details-spacing">
              <MDBBtn onClick={() => addToCart(movie)}>
                Add To Cart <MDBIcon icon="cart-plus" />
              </MDBBtn>
            </MDBCol>
          </MDBCol>
          <MDBCol>
            <MDBCol className="movie-details-spacing">
              <h3>{movie.title}</h3>
            </MDBCol>
            <MDBCol>
              <StarRatings
                isSelectable
                starRatedColor="yellow"
                starDimension="30px"
                numberOfStars={5}
                rating={movie.vote_average / 2}
              />{" "}
              ({movie.vote_count}){" "}
              <MDBCol className="movie-details-spacing">
                {movie.overview}
              </MDBCol>
            </MDBCol>
          </MDBCol>
          <MDBCol>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoKey}`}
            />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );

  return <div>{movieDetails}</div>;
};

const mapStateToProps = (state) => ({
  movie: state.movie.searchedMovie,
  isLoading: state.movie.isLoading,
  isLoading_app: state.auth.isLoading,
  videoKey: state.movie.videoKey,
});

export default connect(mapStateToProps, {
  addToCart,
  loadMovieDetails,
  getMovie,
  loadCart,
  // getMovieVideo,
})(MovieDetails);
