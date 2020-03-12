import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBNavLink
} from "mdbreact";
import { connect } from "react-redux";
import { login, googleLogin } from "../../actions/auth";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import GoogleLogin from "react-google-login";
import { useGoogleLogin } from "react-google-login";
import config from "../../config.json";

const Login = ({ login, authenticated, googleLogin }) => {

  useState(() => {
    // responseGoogle()
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;


  const responseGoogle = async res => {
    googleLogin(res.profileObj.name, res.profileObj.email, res.uc.access_token);
  };




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
        <MDBCol style={{ marginTop: "80px" }} md="6">
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
              <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
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

export default connect(mapStateToProps, { login, googleLogin })(Login);
