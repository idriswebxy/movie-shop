import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMovie, loadMovieDetail, getMovieVideo } from "../../actions/movie";
import { addToCart, loadCart } from "../../actions/cart";
import { MDBBtn, MDBIcon, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { loadMovieDetails, setMovie } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";
import StarRatings from "react-star-ratings";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import config from "../../config.json";

const MovieDetails = ({
  movie,
  addToCart,
  isLoading,
  loadMovieDetails,
  getMovie,
  loadCart,
  isLoading_app,
  voteAverage,
  withRouter,
}) => {
  const [videoKey, setVideoKey] = useState("");

  useEffect(() => {
    loadCart();
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${config.API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setVideoKey(data.results[0].key));
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
          //// <img src={`https://image.tmdb.org/t/p/w330${movie.poster_path}`} />{" "}
          <MDBCol size="7">
            <ReactPlayer
              playing="true"
              url={`https://www.youtube.com/watch?v=${videoKey}`}
            />
            <MDBCol></MDBCol>
            <MDBBtn onClick={() => addToCart(movie)}>
              Add To Cart <MDBIcon icon="cart-plus" />
            </MDBBtn>{" "}
            <StarRatings
              isSelectable
              starRatedColor="yellow"
              starDimension="30px"
              numberOfStars={5}
              rating={movie.vote_average / 2}
            />
            &nbsp; ({movie.vote_count})<h3>{movie.title}</h3>
            <MDBCol>{movie.overview}</MDBCol>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );

  return <div>{movieDetails}</div>;
};

MovieDetails.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.movie.searchedMovie,
  isLoading: state.movie.isLoading,
  isLoading_app: state.auth.isLoading,
});

export default withRouter(
  connect(mapStateToProps, {
    addToCart,
    loadMovieDetails,
    getMovie,
    loadCart,
  })(MovieDetails)
);
