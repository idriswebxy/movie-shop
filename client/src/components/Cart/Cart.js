import React, { useEffect } from "react";
import { connect } from "react-redux";
import Img from "react-image";
import PropTypes from "prop-types";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";
import { deleteItem, loadCart } from "../../actions/cart";
import CartItem from "./CartItem";



const Cart = ({ cart, loadCart }) => {

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <h1>
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
                    />
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          );
        })}
      </div>
    </h1>
  );
};


Cart.propTypes = {
  loadCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart.cart
});

export default connect(mapStateToProps, { deleteItem, loadCart })(Cart);
