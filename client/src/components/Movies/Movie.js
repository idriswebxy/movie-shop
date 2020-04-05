import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart } from "../../actions/cart";
import { MDBView, MDBContainer, MDBBtn, MDBIcon } from "mdbreact";



const Movie = ({ id, image, getMovie, isLoading, addToCart, movie, movieObj, price }) => {
  // useEffect(() => {

  // }, [])

  return (
    <div style={{ textAlign: 'center'}}>
      <div>
        <Link to="/movie_details" onClick={() => getMovie(id)}>
          <img
            className="movie-container"
            src={`http://image.tmdb.org/t/p/w185${image}`}
          />
        </Link>
        <h5>{movieObj.original_title}</h5>
        <h6>({movieObj.release_date.slice(0, 4)})</h6>
      </div>

      <div>
        <h5>${price}</h5>
        <MDBBtn onClick={() => addToCart(movieObj)}>
          Add To Cart <MDBIcon icon="cart-plus" />
        </MDBBtn>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { getMovie, addToCart })(Movie);
