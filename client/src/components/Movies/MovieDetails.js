import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMovie, loadMovieDetail, getMovieVideo } from "../../actions/movie";
import { addToCart, loadCart } from "../../actions/cart";
import { MDBBtn, MDBIcon, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { loadMovieDetails, setMovie } from "../../actions/movie";
// import SpinnerPage from "../Layout/SpinnerPage";
import StarRatings from "react-star-ratings";
import ReactPlayer from "react-player/youtube";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../../config";
import "./MovieDetails.css";
import MovieThumb from "./MovieThumb"
import FontAwesome from "react-fontawesome";



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
  const [movieID, setMovieID] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setVideoKey(data.results[0].key));
    loadCart();
    window.scrollTo(0, 0);
  }, []);

  // if (isLoading) {
  //   return <SpinnerPage />;
  // }

  let movieDetails = (
    <div>
      {/* <MDBRow middle="true">
        <MDBCol size="4">
          <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} />
          <MDBCol>
            <MDBBtn onClick={() => addToCart(movie)}>
              Add To Cart <MDBIcon icon="cart-plus" />
            </MDBBtn>
          </MDBCol>
        </MDBCol>
        <MDBCol size="5">
          <ReactPlayer
            playing="false"
            controls="true"
            url={`https://www.youtube.com/watch?v=${videoKey}`}
          />
          &nbsp;
          <MDBCol center="true">
            <h2>{movie.title}</h2>
            &nbsp;
            <MDBCol>
              <StarRatings
                isSelectable
                starRatedColor="yellow"
                starDimension="30px"
                numberOfStars={5}
                rating={movie.vote_average / 2}
              />{" "}
              &nbsp;({movie.vote_count})
            </MDBCol>
            &nbsp;
            <MDBCol>{movie.overview}</MDBCol>
          </MDBCol>
        </MDBCol>
      </MDBRow> */}
      <div
        className="rmdb-movieinfo"
        style={{
          background: movie.backdrop_path
            ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}')`
            : "#000",
        }}
      >
        <div className="rmdb-movieinfo-content">
          <div className="rmdb-movieinfo-thumb">
            <MovieThumb
              image={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                  : "./images/no_image.jpg"
              }
              clickable={false}
            />
            <div className="rmdb-movieinfo-text">
              <h1>{movie.title}</h1>
              <h3>PLOT</h3>
              <p>{movie.overview}</p>
              <h3>IMDB RATING</h3>
              <div className="rmdb-rating">
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
              {/* {props.directors.length > 1 ? (
                <h3>DIRECTORS</h3>
              ) : (
                <h3>DIRECTOR</h3>
              )}{" "} */}
              {/* {props.directors.map((element, i) => {
                return (
                  <p key={i} className="rmdb-director">
                    {element.name}
                  </p>
                );
              })} */}
            </div>
            <FontAwesome className="fa-film" name="film" size="5x" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
    // style={{
    //   backgroundImage: `linear-gradient(to right,
    //     rgba(19, 38, 47, 0.7) 0%,
    //     rgba(9, 28, 37, 0.7) 100%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover",
    //   padding: "186px",
    // }}
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
