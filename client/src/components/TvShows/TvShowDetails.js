import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMovie, loadMovieDetail } from "../../actions/movie";
import { addToCart, loadCart } from "../../actions/cart";
import { MDBBtn, MDBIcon, MDBContainer } from "mdbreact";
import { loadMovieDetails, setMovie } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";

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
  }, []);

  if (isLoading) {
    return <SpinnerPage />;
  }

  let tvShowDetails = (
    <MDBContainer>
      <div
        style={{
          backgroundImage: `linear-gradient(to right,
            rgba(19, 38, 47, 0.925) 0%,
            rgba(9, 28, 37, 0.925) 100%), url(https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginTop: "100px",
        }}
      >
        <div>
          <img src={`https://image.tmdb.org/t/p/w342${tvShow.poster_path}`} />

          <h3>{tvShow.name}</h3>
          <h6>{tvShow.overview}</h6>
          <MDBBtn onClick={() => addToCart(tvShow)}>
            Add To Cart <MDBIcon icon="cart-plus" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );

  return <div>{tvShowDetails}</div>;
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
