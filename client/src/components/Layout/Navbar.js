import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import {
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBView,
  MDBMask,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBCollapse,
  MDBNavbarToggler,
  MDBNavbarNav
} from "mdbreact";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { logOut } from "../../actions/auth";
import { loadCart } from "../../actions/cart";
import "../../App.css";

const Navbar = ({
  auth: { authenticated, isLoading, userInfo },
  logOut,
  cart,
  pageNum
}) => {


  const [collapse, setCollapse] = useState(false);

  const navColor = { backgroundColor: "#00CED1" };
  const container = { height: 1300 };

  const onClick = () => {
    setCollapse(true);

    if (collapse == true) {
      setCollapse(false);
    }

    setTimeout(() => {
      setCollapse(false);
    }, 2500); 
  };

  const authLinks = (
    <MDBNavbar style={navColor} dark expand="md" scrolling fixed="top">
      <MDBNavbarBrand>
        <MDBNavLink style={{ color: "white" }} to="/movies">
          Movie Shop <MDBIcon icon="home" /> 
        </MDBNavLink>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={onClick} />
      <MDBCollapse isOpen={collapse} navbar>
      <MDBIcon icon="user-alt" /> Welcome {userInfo.name + "!"}
        <MDBNavbarNav right>
        <MDBNavItem active>
            <MDBNavLink to="/tv_shows">
              TvShows <MDBIcon icon="film" />
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active>
            <MDBNavLink to={"/movies"}>
              Movies <MDBIcon icon="film" />
            </MDBNavLink>
          </MDBNavItem>

          <MDBNavItem>
            <MDBNavLink to="/cart">
              <div className="align-cart">
                Cart <MDBIcon icon="shopping-cart" />
                <div className="lblCartCount">{cart.length}</div>
              </div>
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink onClick={logOut} to="/login">
              Logout <MDBIcon icon="sign-out-alt" />
            </MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );

  const guestLinks = (
    <MDBNavbar style={navColor} dark expand="md" scrolling fixed="top">
      <MDBNavbarBrand href="/">
        <strong>Movie Shop</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={onClick} />
      <MDBCollapse isOpen={collapse} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="/">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/login">Login</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/register">Sign up</MDBNavLink>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );

  return <div>{authenticated ? authLinks : guestLinks}</div>;
};

Navbar.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart.cart,
  pageNum: state.movie.pageNum
});

export default connect(mapStateToProps, { logOut })(Navbar);
