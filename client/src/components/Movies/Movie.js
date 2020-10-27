import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie, getMovieIds } from "../../actions/movie";
import Spinner from "../Spinner/Spinner";
import { addToCart, loadCart } from "../../actions/cart";
import {
  MDBView,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBAnimation,
  MDBRow,
  MDBCol,
} from "mdbreact";
import moment from "moment";
import MovieDetails from "./MovieDetails";

const Movie = ({
  id,
  image,
  getMovie,
  isLoading,
  addToCart,
  movieObj,
  price,
  releaseDate,
  title,
  index,
}) => {
  let movieLink = (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <MDBView hover zoom>
            <Link to={"/movieInfo/" + id} onClick={() => getMovie(id)}>
              <img src={`http://image.tmdb.org/t/p/w500${image}`} />
            </Link>
          </MDBView>

          <div style={{ textAlign: "center", paddingBottom: "50px" }}>
            <h5>{title}</h5>
            <h6>{moment(releaseDate).format("LL")}</h6>
            <h5>${price}</h5>

            <MDBBtn onClick={() => addToCart(movieObj, index)}>
              Add To Cart <MDBIcon icon="cart-plus" />
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );

  return (
    <div>
      <MDBAnimation type="zoomIn" duration="1s">
        {movieLink}
      </MDBAnimation>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.movie.isLoading,
  userId: state.auth.userInfo._id,
});

export default connect(mapStateToProps, { getMovie, addToCart })(Movie);
