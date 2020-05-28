import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMovie, loadMovieDetail } from "../../actions/movie";
import { addToCart, loadCart } from "../../actions/cart";
import { MDBBtn, MDBIcon, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { loadMovieDetails, setMovie } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";
import StarRatings from "react-star-ratings";

const MovieDetails = ({
  movie,
  addToCart,
  isLoading,
  loadMovieDetails,
  getMovie,
  loadCart,
  isLoading_app,
  voteAverage,
}) => {
  useEffect(() => {
    loadCart();
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
        padding: "165px",
      }}
    >
      <MDBContainer>
        <MDBRow>
          <MDBCol size="4">
            <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />{" "}
            <MDBCol>
              <h3>{movie.title}</h3>
            </MDBCol>
            <MDBCol className="">
              <MDBBtn onClick={() => addToCart(movie)}>
                Add To Cart <MDBIcon icon="cart-plus" />
              </MDBBtn>
            </MDBCol>
          </MDBCol>
          <MDBCol>
            <StarRatings
              isSelectable
              starRatedColor="yellow"
              numberOfStars={5}
              rating={movie.vote_average / 2}
            />{" "}
            ({movie.vote_count}) <div>{movie.overview}</div>
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
});

export default connect(mapStateToProps, {
  addToCart,
  loadMovieDetails,
  getMovie,
  loadCart,
})(MovieDetails);
