import React, { useState, useEffect } from "react";
// import GoogleLogin from "react-google-login";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "../../actions/alert";
import { register, setProfile } from "../../actions/auth";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  MDBNavLink,
} from "mdbreact";



const Register = ({ setAlert, register, authenticated }) => {

  // const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  useEffect(() => {

  }, []);



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, email, password, password2 } = formData;


  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match!", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (authenticated) {
    return <Redirect to="/movies" />;
  }

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol style={{ marginTop: "80px" }} md="6">
          <form onSubmit={(e) => onSubmit(e)}>
            <h4>Sign up</h4>
            <div className="">
              <MDBInput
                label="Your name"
                icon="user"
                group
                name="name"
                type="text"
                validate
                error="wrong"
                success="right"
                value={name}
                onChange={(e) => onChange(e)}
              />
              <MDBInput
                label="Your email"
                icon="envelope"
                group
                name="email"
                type="email"
                validate
                error="wrong"
                success="right"
                value={email}
                onChange={(e) => onChange(e)}
              />
              <MDBInput
                label="Your password"
                icon="lock"
                group
                name="password"
                type="password"
                validate
                success="right"
                value={password}
                onChange={(e) => onChange(e)}
              />
              <MDBInput
                label="Confirm your password"
                icon="lock"
                group
                name="password2"
                type="password"
                validate
                error="wrong"
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="text-center">
              <MDBRow>
                <MDBCol>
                  <MDBBtn type="submit" color="primary">
                    Register
                  </MDBBtn>
                </MDBCol>
                <MDBCol></MDBCol>
              </MDBRow>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  authenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
