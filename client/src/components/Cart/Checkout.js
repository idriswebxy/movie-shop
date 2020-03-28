import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import Img from "react-image";



const Checkout = ({ cart }) => {
  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <MDBContainer>
      {cart.map(movie => (
        <div style={{ textAlign: "left" }}>
          <div>
            <Img
              className="movie-container"
              src={`https://image.tmdb.org/t/p/w92${movie.image}`}
            />
            <h3>{movie.name}</h3>
          </div>
        </div>
      ))}
    </MDBContainer>
  );
};

const mapStateToProps = state => ({
  cart: state.cart.cart
});

export default connect(mapStateToProps)(Checkout);
