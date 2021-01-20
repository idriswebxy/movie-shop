import React, { useEffect } from "react";
import { connect } from "react-redux";
import Img from "react-image";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import {
  MDBContainer,
  MDBBtn,
  MDBNavLink,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdbreact";
import { deleteItem, loadCart, getPriceTotal } from "../../actions/cart";
import Spinner from "../Spinner/Spinner";
import { useAuth0 } from "@auth0/auth0-react";

const Cart = ({
  cart,
  loadCart,
  getPriceTotal,
  total,
  loading,
  deleteItem,
  price = 2.99,
  userId,
  authenticated
}) => {
  const { isLoading } = useAuth0();

  useEffect(() => {
    loadCart();
    getPriceTotal(userId);
  }, [total]);

  if (!authenticated) {
    return <Redirect to="/login" />
  }

  
  if (loading || isLoading) {
    return <Spinner />;
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
          {cart.map((movie, index) => (
            <tr key={index}>
              <td>
                <Img
                  src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                />
                <h5 style={{ margin: "10px" }}>
                  {!movie.original_title ? movie.name : movie.original_title}
                </h5>
              </td>
              <td>
                <div>${price}</div>
              </td>
              <td>
                <MDBBtn onClick={() => deleteItem(movie.id, index, price)}>
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
  userId: state.auth.userInfo._id,
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, {
  deleteItem,
  loadCart,
  getPriceTotal,
})(Cart);
