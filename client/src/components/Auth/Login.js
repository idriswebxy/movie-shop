import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { Link, Redirect } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBNavLink
} from "mdbreact";
import { useAuth0 } from "../../react-auth0-spa";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

const Login = ({ login, authenticated }) => {
  const { loading, user, loginWithRedirect } = useAuth0();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (authenticated) {
    return <Redirect to="/movies" />;
  }

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol style={{ marginTop: "50px" }} md="6">
          <form onSubmit={e => onSubmit(e)}>
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
                onChange={e => onChange(e)}
              />
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                name="password"
                onChange={e => onChange(e)}
              />
            </div>
            <MDBRow>
              <MDBCol>
                <MDBBtn type="submit">Login</MDBBtn>
              </MDBCol>

              <MDBNavLink to="/products">
                <MDBCol>
                  <Button
                    className="primary"
                    onClick={() => loginWithRedirect({})}
                  >
                    Sign in With Google
                  </Button>
                </MDBCol>
              </MDBNavLink>
            </MDBRow>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  authenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, { login })(Login);
