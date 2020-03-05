import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import {
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBIcon
} from "mdbreact";
import { useAuth0 } from "../../react-auth0-spa";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { loadCart } from "../../actions/cart";
import Cart from "../Cart/Cart";
import "../../App.css";

const Navbar = ({ auth: { authenticated, loading, user: { name } }, logout, cart }) => {
  
  // const { isAuthenticated, user, loading, logout } = useAuth0();

  
  const authLinks = (
    <MDBNav className="justify-content-center" color="cyan">
    <MDBNavItem style={{ marginTop: "7px", marginRight: "50px"}} className="justify-content-left">Welcome {name}!</MDBNavItem>
      <MDBNavItem>
        <MDBNavLink className="white-text" to="/movies">
          Home
        </MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink style={{ }} onClick={logout} className="white-text" to="/login">
          Logout
        </MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink className="white-text" to="/cart">
          <div className="align-cart">
            <MDBIcon icon="cart-arrow-down" />
            <div className="lblCartCount">{cart.length}</div>
          </div>
        </MDBNavLink>
      </MDBNavItem>
    </MDBNav>
  );

  const guestLinks = (
    <MDBNav className="justify-content-center" color="cyan">
      <MDBNavItem>
        <MDBNavLink className="white-text" active to="/">
          Home
        </MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink className="white-text" to="/register">
          Sign up
        </MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink className="white-text" to="/login">
          Login
        </MDBNavLink>
      </MDBNavItem>
    </MDBNav>
  );

  return <div>{authenticated ? authLinks : guestLinks}</div>;
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart.cart
});

export default connect(mapStateToProps, { logout })(Navbar);
