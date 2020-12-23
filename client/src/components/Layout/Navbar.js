import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import {
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBContainer,
  MDBNavbar,
  MDBIcon,
  MDBNavbarBrand,
  MDBCollapse,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBBtn,
} from "mdbreact";
import { logOut, loadUser, googleAuth } from "../../actions/auth";
import { loadCart } from "../../actions/cart";
import "../../App.css";
import Spinner from "../Spinner/Spinner";
import { useAuth0 } from "@auth0/auth0-react";
import SearchPage from "../Search/Search";
import { REACT_APP_SERVER_URL } from "../../config";
import { LOGIN_SUCCESS, USER_LOADED } from "../../actions/types";
import store from "../../store";
import axios from "axios";

const Navbar = ({
  auth: { authenticated, isLoading, userInfo },
  logOut,
  cart,
  dispatch
}) => {

  const [authUser, setAuthUser] = useState(null);

  

  const { user, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();


  let accountName = null;
  let serverUrl = REACT_APP_SERVER_URL;


  if (isAuthenticated) {
    accountName = user.name;
  } else {
    accountName = userInfo.name;
  }
  
  const googleAuth = async (user) => {
    try {
      const token = await getAccessTokenSilently();
  
      localStorage.setItem("auth0_token", token)
      setAuthUser(user)

    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    googleAuth(user)
  }, [])

  
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
        <MDBIcon icon="user-alt" /> Welcome {accountName + "!"}
        <MDBNavbarNav right>
          <MDBNavItem active>
            <MDBNavLink to="/tv_shows">
              Tv Shows <MDBIcon icon="film" />
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem active>
            <MDBNavLink to="/movies">
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
          {authenticated ? (
            <MDBNavItem>
              <MDBNavLink onClick={logOut} to="/login">
                Logout <MDBIcon icon="sign-out-alt" />
              </MDBNavLink>
            </MDBNavItem>
          ) : (
            <MDBNavItem>
              <MDBNavLink onClick={() => logout()} to="/login">
                Logout <MDBIcon icon="sign-out-alt" />
              </MDBNavLink>
              {/* <MDBBtn onClick={() => callSecureApi(user)}>TEST</MDBBtn> */}
            </MDBNavItem>
          )}
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

  return (
    <div>
      {authenticated == true || isAuthenticated == true
        ? authLinks
        : guestLinks}
    </div>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   callSecureApi: dispatch({ type: GOOGLE_AUTH })
// }


const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart.cart,
});

export default connect(mapStateToProps, { logOut, googleAuth })(Navbar);
