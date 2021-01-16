import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addToCart, loadCart } from "../../actions/cart";
import { MDBBtn, MDBIcon, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { loadMovieDetails, setMovie, getMovie } from "../../actions/movie";
import SpinnerPage from "../Spinner/Spinner";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
} from "../../config";
import "./MovieDetails.css";
import Movie from "../MovieThumb/MovieThumb";
import MovieThumb from "../MovieThumb/MovieThumb";
import moment from "moment";



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
  // const [movieID, setMovieID] = useState(null);
  let movieID = null;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id ? movie.id : movieID}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setVideoKey(data.results[0].key));
    loadCart();
    movieID = movie.id;
    window.scrollTo(0, 0);

  }, []);

  if (isLoading) {
    return <SpinnerPage />;
  }

  let movieDetails = (
    <div
      style={{
        // background: movie.backdrop_path
        //   ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`
        //   : "#000",
        marginTop: "72px",
      }}
    >
      <MDBContainer>
        <MDBRow>
          <MovieThumb
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : "./images/no_image.jpg"
            }
            clickable={false}
          />
          <div>
            <div style={{ margin: "20px"}}>
              <h1>{movie.title}</h1>
              <h6>{moment(movie.release_date).format("LL")}</h6>
              <MDBBtn onClick={() => addToCart(movie)}>
                Add To Cart <MDBIcon icon="cart-plus" />
              </MDBBtn>
            </div>

            <h3>PLOT</h3>
            <p>{movie.overview}</p>
            <h3>IMDB RATING</h3>

            <meter
              min="0"
              max="100"
              optimum="100"
              low="40"
              high="70"
              value={movie.vote_average * 10}
            />
            <p className="rmdb-score">{movie.vote_average}</p>
          </div>
        </MDBRow>
        <MDBRow>
          <ReactPlayer
            playing=""
            controls="true"
            url={`https://www.youtube.com/watch?v=${videoKey}`}
          />
        </MDBRow>
      </MDBContainer>
    </div>
  );

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right,
        rgba(19, 38, 47, 0.7) 0%,
        rgba(9, 28, 37, 0.7) 100%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,

        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {movieDetails}
    </div>
  );
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
