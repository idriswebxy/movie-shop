import React from 'react'
import { connect } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";




const Checkout = ({ cart }) => {
  return (
    // <MDBContainer>
    //  <h1>Checkout</h1>
    // </MDBContainer>

    <h1>Checkout!!</h1>
  )
}



const mapStateToProps = state => ({
  cart: state.cart.cart
});


export default connect(mapStateToProps)(Checkout);
