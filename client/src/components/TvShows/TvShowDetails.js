import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMovie, loadMovieDetail } from "../../actions/movie";
import { addToCart, loadCart } from "../../actions/cart";
import { MDBBtn, MDBIcon, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { loadMovieDetails, setMovie } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";
import StarRatings from "react-star-ratings";

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
    <div
      style={{
        backgroundImage: `linear-gradient(to right,
        rgba(19, 38, 47, 0.925) 0%,
        rgba(9, 28, 37, 0.925) 100%), url(https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: "186px",
      }}
    >
      <MDBContainer>
        <MDBRow>
          <MDBCol size="4">
            <img src={`https://image.tmdb.org/t/p/w342${tvShow.poster_path}`} />
            <MDBCol className="movie-details-spacing">
              <MDBBtn onClick={() => addToCart(tvShow)}>
                Add To Cart <MDBIcon icon="cart-plus" />
              </MDBBtn>
            </MDBCol>
          </MDBCol>
          <MDBCol>
            <MDBCol className="movie-details-spacing">
              <h3>{tvShow.name}</h3>
            </MDBCol>
            <MDBCol>
              <MDBCol>
                <StarRatings
                  isSelectable
                  starRatedColor="yellow"
                  starDimension="30px"
                  numberOfStars={5}
                  rating={tvShow.vote_average / 2}
                />{" "}
                ({tvShow.vote_count}){" "}
              </MDBCol>
              <MDBCol className="movie-details-spacing">
                <h6>{tvShow.overview}</h6>
              </MDBCol>
            </MDBCol>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
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
