import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getMovie, loadMovieDetail } from "../../actions/movie";
import { addToCart, loadCart } from "../../actions/cart";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBIcon,
  MDBView,
  MDBContainer
} from "mdbreact";
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { loadMovieDetails } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";


const MovieDetails = ({ movie, addToCart, isLoading, loadMovieDetails, getMovie, loadCart }) => {
  useEffect(() => {
    loadMovieDetails();
    loadCart();

  }, [movie]);

  if (isLoading) {
    return <SpinnerPage />;
  }

  return (
    <MDBContainer>
      <div
        style={{
          backgroundImage: `linear-gradient(to right,
            rgba(19, 38, 47, 0.925) 0%,
            rgba(9, 28, 37, 0.925) 100%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          marginTop: "40px"
        }}
      >
        <div>
          <img
            style={{ width: "22rem", borderRadius: "10px" }}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          />

          <h3>{movie.title}</h3>
          <h6>{movie.overview}</h6>
          <MDBBtn onClick={() => addToCart(movie)}>
            Add To Cart <MDBIcon icon="cart-plus" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
    // <MDBContainer>
    
    // <Card>
    //     <CardImg top width="100%" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="Card image cap" />
    //     <CardBody>
    //       <CardTitle>Card title</CardTitle>
    //       <CardSubtitle>Card subtitle</CardSubtitle>
    //       <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
    //       <Button onClick={() => addToCart(movie)}>Add To Cart</Button>
    //     </CardBody>
    //   </Card>
    
    // </MDBContainer>


  );
};

const mapStateToProps = state => ({
  movie: state.movie.searchedMovie,
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { addToCart, loadMovieDetails, getMovie, loadCart })(
  MovieDetails
);
