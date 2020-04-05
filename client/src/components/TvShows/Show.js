import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getShow } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCartTvShow } from "../../actions/cart";
import { MDBView, MDBContainer, MDBBtn, MDBIcon } from "mdbreact";

const Show = ({
  id,
  image,
  getShow,
  isLoading,
  tvShowObj,
  price,
  addToCartTvShow
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <Link to="/show_details" onClick={() => getShow(id)}>
          <img
            className="movie-container"
            src={`http://image.tmdb.org/t/p/w185${image}`}
          />
        </Link>
        <h5>{tvShowObj.name}</h5>
        <h6>({tvShowObj.first_air_date.slice(0, 4)})</h6>
      </div>

      <div>
        <h5>${price}</h5>
        <MDBBtn onClick={() => addToCartTvShow(tvShowObj)}>
          Add To Cart <MDBIcon icon="cart-plus" />
        </MDBBtn>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.movie.isLoading
});

export default connect(mapStateToProps, { getShow, addToCartTvShow })(Show);
