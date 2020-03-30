import React, { useEffect } from "react";
import { connect } from "react-redux";
import Img from "react-image";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBNavLink } from "mdbreact";
import { deleteItem, loadCart, getPriceTotal } from "../../actions/cart";
import CartItem from "./CartItem";


const Cart = ({ cart, loadCart, getPriceTotal, price }) => {
  useEffect(() => {
    loadCart();
    getPriceTotal(cart);
  }, []);


  

  return (
    <div>
      <p>Cart: {cart.length} item(s)</p>
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

        <div style={{ marginLeft: '40px'}}>
         <h2>Total: ${price}</h2>
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
  price: state.cart.price
});

export default connect(mapStateToProps, { deleteItem, loadCart, getPriceTotal })(Cart);
