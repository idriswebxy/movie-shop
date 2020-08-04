import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie, getMovieIds } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, loadCart } from "../../actions/cart";
import { MDBView, MDBContainer, MDBBtn, MDBIcon, MDBSpinner } from "mdbreact";
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

  let movieLink = (
    <div style={{ color: "white" }}>
      <MDBView hover zoom>
        <Link to="/movie_details" onClick={() => getMovie(id)}>
          <img src={`http://image.tmdb.org/t/p/w185${image}`} />
        </Link>
      </MDBView>
      <div>
        <h5>{title}</h5>
        <h6>{moment(releaseDate).format("LL")}</h6>
        <h5>${price}</h5>
      </div>

      <MDBBtn onClick={() => addToCart(movieObj)}>
        Add To Cart <MDBIcon icon="cart-plus" />
      </MDBBtn>
    </div>
  );

  return <div>{movieLink}</div>;
};

const mapStateToProps = (state) => ({
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { getMovie, addToCart })(Movie);
