import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie, getMovieIds } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, loadCart } from "../../actions/cart";
import { MDBView, MDBContainer, MDBBtn, MDBIcon } from "mdbreact";
import moment from "moment";
import MovieDetails from "./MovieDetails";

const Movie = ({
  id,
  image,
  getMovie,
  isLoading,
  addToCart,
  movie,
  movieObj,
  price,
  releaseDate,
  title,
}) => {
  useEffect(() => {}, []);

  let movieLink = (
    <div style={{ textAlign: "center", color: "white" }}>
      <div>
        <Link to="/movie_details" onClick={() => getMovie(id)}>
          <img
            className="movie-container"
            src={`http://image.tmdb.org/t/p/w185${image}`}
          />
        </Link>
        <h5>{title}</h5>
        <h6>{moment(releaseDate).format("LL")}</h6>
      </div>

      <div>
        <h5>${price}</h5>
        <MDBBtn onClick={() => addToCart(movieObj)}>
          Add To Cart <MDBIcon icon="cart-plus" />
        </MDBBtn>
      </div>
    </div>
  );

  return (
    <div>
      <MDBView hover zoom>{movieLink}</MDBView>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { getMovie, addToCart })(Movie);
