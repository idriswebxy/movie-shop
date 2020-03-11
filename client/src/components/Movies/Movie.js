import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart } from "../../actions/cart";
import { MDBView, MDBContainer, MDBBtn, MDBIcon } from "mdbreact";

const Movie = ({ id, image, getMovie, isLoading, addToCart, movie }) => {
  // useEffect(() => {

  // }, [])

  return (
    <div>
      <div>
        <Link to="/movie_details" onClick={() => getMovie(id)}>
          <img
            className="movie-container"
            src={`http://image.tmdb.org/t/p/w185${image}`}
          />
        </Link>
      </div>

      <div className='float-left'>
        <h5>$2.99</h5>
        <MDBBtn onClick={() => addToCart(movie)}>
          Add To Cart <MDBIcon icon="cart-plus" />
        </MDBBtn>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.movie.isLoading,
  movie: state.movie.searchedMovie
});

export default connect(mapStateToProps, { getMovie, addToCart })(Movie);
