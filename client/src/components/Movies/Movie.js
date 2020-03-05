import React, { useEffect } from "react";
import Img from "react-image";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie } from "../../actions/movie";
import {  } from "../../actions/movie";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBIcon,
  MDBView
} from "mdbreact";
import SpinnerPage from "../Layout/SpinnerPage";


const Movie = ({ id, image, getMovie, isLoading }) => {

  // useEffect(() => {
    
   // }, [])


  return (
    <Link to="/movie_details" onClick={() => getMovie(id)}>
      <img
        className="movie-container"
        src={`http://image.tmdb.org/t/p/w342${image}`}
      />
    </Link>
  );
};

const mapStateToProps = state => ({
  isLoading: state.movie.isLoading
})

export default connect(mapStateToProps, { getMovie })(Movie);
