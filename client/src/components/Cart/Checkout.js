import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import Img from "react-image";

const Checkout = () => {
  return (
    <MDBContainer>
      <h1
        style={{
          paddingTop: "20%",
          margin: "auto",
          display: "flex",
          color: "black",
        }}
      >
        Your order is complete!{" "}
      </h1>
    </MDBContainer>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
});

export default connect(mapStateToProps)(Checkout);
