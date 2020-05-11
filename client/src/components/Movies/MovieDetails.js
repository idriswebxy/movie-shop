import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMovie, loadMovieDetail } from "../../actions/movie";
import { addToCart, loadCart } from "../../actions/cart";
import { MDBBtn, MDBIcon, MDBContainer } from "mdbreact";
import { loadMovieDetails, setMovie } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";

const MovieDetails = ({
  movie,
  addToCart,
  isLoading,
  loadMovieDetails,
  getMovie,
  loadCart,
}) => {
  useEffect(() => {
    loadCart();
  }, []);

  if (isLoading) {
    return <SpinnerPage />;
  }

  let movieDetails = (
    <div
      className="movie-details"
      style={{
        backgroundImage: `linear-gradient(to right,
      rgba(19, 38, 47, 0.925) 0%,
      rgba(9, 28, 37, 0.925) 100%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        marginTop: "100px",
      }}
    >
      <MDBContainer>
        <div className="movie-details">
          <div>
            <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />{" "}
            <h6>{movie.overview}</h6>
            <h3>{movie.title}</h3>
            <MDBBtn onClick={() => addToCart(movie)}>
              Add To Cart <MDBIcon icon="cart-plus" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </div>
  );

  return <div>{movieDetails}</div>;
};

const mapStateToProps = (state) => ({
  movie: state.movie.searchedMovie,
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, {
  addToCart,
  loadMovieDetails,
  getMovie,
  loadCart,
})(MovieDetails);
