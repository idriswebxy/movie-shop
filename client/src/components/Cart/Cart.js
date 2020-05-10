import React, { useEffect } from "react";
import { connect } from "react-redux";
import Img from "react-image";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBNavLink } from "mdbreact";
import { deleteItem, loadCart, getPriceTotal } from "../../actions/cart";
import CartItem from "./CartItem";
import SpinnerPage from "../Layout/SpinnerPage";


const Cart = ({ cart, loadCart, getPriceTotal, total, loading }) => {

  useEffect(() => {
    loadCart();
    getPriceTotal(cart);
    console.log(cart)
  }, []);

  if (loading) {
    return <SpinnerPage />;
  }

  return (
    <div>
      <h3>Cart: {cart.length} item(s)</h3>
      <div>
        {cart.map((movie, key) => {
          return (
            <div className="movie-border" key={key}>
              <MDBContainer>
                <MDBRow>
                  <MDBCol>
                    <CartItem
                      movieImg={movie.image}
                      movieDesc={movie.description}
                      movieName={movie.name}
                      movieId={movie._id}
                      price={movie.price}
                    />
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          );
        })}

        <div style={{ marginLeft: "10px", color: 'black' }}>
          <h2>Total: ${total}</h2>
          <MDBNavLink to="/checkout">
            <MDBBtn>Check Out</MDBBtn>
          </MDBNavLink>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  loadCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart.cart,
  total: state.cart.totalPrice,
  loading: state.cart.loading
});

export default connect(mapStateToProps, {
  deleteItem,
  loadCart,
  getPriceTotal
})(Cart);
