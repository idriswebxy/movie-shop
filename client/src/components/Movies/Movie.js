import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie, getMovieIds } from "../../actions/movie";
import Spinner from "../Spinner/Spinner";
import { addToCart, loadCart, auth0_addToCart } from "../../actions/cart";
import {
  MDBView,
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBAnimation,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import moment from "moment";
import MovieDetails from "./MovieDetails";
import auth from "../../reducers/auth";
import { useAuth0 } from "@auth0/auth0-react";

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
  auth0_addToCart,
}) => {
  const { isAuthenticated } = useAuth0();

  const [moviePrev, setMoviePrev] = useState(false);

  const [modal, setModal] = useState(false)
  

  const toggle = () => {
    setModal(!modal);
  }


  let movieLink = (
    <MDBContainer>
      <MDBRow>
        <MDBCol>
          <MDBView
            hover
            zoom
            onMouseEnter={() => setMoviePrev(true)}
            onMouseLeave={() => setMoviePrev(false)}
          >
            <Link to={"/movieInfo/" + id} onClick={() => getMovie(id)}>
              <img src={`http://image.tmdb.org/t/p/w500${image}`} />
            </Link>
          </MDBView>

          <div style={{ textAlign: "center", paddingBottom: "50px" }}>
            <h5>{title}</h5>
            <h6>{moment(releaseDate).format("LL")}</h6>

            <MDBBtn onClick={() => addToCart(movieObj)}>
              <MDBIcon icon="cart-plus" /> Add To Cart
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );

  return (
    <div>
      <MDBAnimation type="zoomIn" duration="1s">
        <div>{movieLink}</div>
      </MDBAnimation>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.movie.isLoading,
  // userId: state.auth.userInfo._id,
});

export default connect(mapStateToProps, {
  getMovie,
  addToCart,
  auth0_addToCart,
})(Movie);
