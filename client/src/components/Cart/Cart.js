import React, { useEffect } from "react";
import { connect } from "react-redux";
import Img from "react-image";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBNavLink,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdbreact";
import { deleteItem, loadCart, getPriceTotal } from "../../actions/cart";
import CartItem from "./CartItem";
import SpinnerPage from "../Layout/SpinnerPage";
import { Alert } from "reactstrap";


const Cart = ({
  cart,
  loadCart,
  getPriceTotal,
  total,
  loading,
  deleteItem,
  price = 2.99,
  userId
}) => {
  useEffect(() => {
    loadCart();
    // getPriceTotal(cart);
    console.log(cart.map(m => m.cartItem))
  }, [loading]);


  if (loading) {
    return <SpinnerPage />;
  }


  let cartItems = (
    <div>
      <MDBTable>
        <MDBTableHead>
          <tr>
            <th>Movie</th>
            <th>Price</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {cart.map((movie, key) => (
            <tr key={key}>
              <td>
                <Img src={`https://image.tmdb.org/t/p/w92${movie.cartItem.image}`} />
                <h5>{movie.cartItem.name}</h5>
              </td>
              <td>
                <div>${movie.cartItem.price}</div>
              </td>
              <td>
                <MDBBtn onClick={() => deleteItem(userId, movie.cartItem.id, price)}>
                  Remove
                </MDBBtn>
              </td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );

  let checkOut = (
    <div style={{ marginLeft: "10px", color: "white" }}>
      <h2>Total: ${total.toFixed(2)}</h2>
      <MDBNavLink to="/checkout">
        <MDBBtn>Check Out</MDBBtn>
      </MDBNavLink>
    </div>
  );

  return (
    <MDBContainer>
      <div style={{ marginTop: "100px" }}>
        <h3>Cart: {cart.length} item(s)</h3>
        <div>{cartItems}</div>
        <div>{checkOut}</div>
      </div>
    </MDBContainer>
  );
};

Cart.propTypes = {
  loadCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  total: state.cart.totalPrice,
  loading: state.cart.loading,
  userId: state.auth.userInfo._id
});

export default connect(mapStateToProps, {
  deleteItem,
  loadCart,
  getPriceTotal,
})(Cart);
