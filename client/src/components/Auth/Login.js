import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { NavLink as RouterNavLink } from "react-router-dom";
import { NavLink, NavItem, Button } from "react-bootstrap";
import SpinnerPage from "../Layout/SpinnerPage";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBNavLink,
} from "mdbreact";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { useAuth0 } from "@auth0/auth0-react";


const Login = ({ login, authenticated, loading, getCurrentProfile, page }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout
  } = useAuth0();

  const { email, password } = formData;

  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();

  const toggle = () => setIsOpen(!isOpen);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (authenticated) {
    return <Redirect to="/movies/1" />;
  }

  if (loading) {
    return <SpinnerPage />;
  }

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol style={{ marginTop: "80px" }} md="6">
          <form onSubmit={(e) => onSubmit(e)}>
            <h4>Sign in</h4>
            <div className="grey-text">
              <MDBInput
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                name="email"
                onChange={(e) => onChange(e)}
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                name="password"
                onChange={(e) => onChange(e)}
              />
            </div>
            <MDBRow>
              <MDBCol>
                <MDBBtn type="submit">Login</MDBBtn>
              </MDBCol>

              {!isAuthenticated ? (
                <NavItem>
                  <Button
                    id="qsLoginBtn"
                    color="primary"
                    className="btn-margin"
                    onClick={() => loginWithRedirect()}
                  >
                    Sign in Google
                  </Button>
                </NavItem>
              ) : (
                <Button onClick={() => logout()}>Logout</Button>
              )}
            </MDBRow>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
  page: state.movie.page,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { login })(Login);
