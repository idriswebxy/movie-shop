import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from "mdbreact";
import { Redirect } from "react-router-dom";
import "./Landing.css";
import "../MainImage/MainImage.css";
import "../../App.css";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../../components/Spinner/Spinner";



const Landing = ({ login, authenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {
    isAuthenticated,
    isLoading
  } = useAuth0();


  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (authenticated) {
    return <Redirect to="/movies" />;
  }
  
  if (isLoading || authenticated) {
    return <Spinner />;
  }

  console.log(authenticated)

  return (
    <div className="app-main">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form onSubmit={(e) => onSubmit(e)}>
              <p className="h4 text-center mb-4">Sign in</p>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your email
              </label>
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
              <br />
              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                Your password
              </label>
              <MDBInput
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
                name="password"
                onChange={(e) => onChange(e)}
              />
              <div className="text-center mt-4">
                <MDBBtn color="indigo" type="submit">
                  Login
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth.authenticated
});

export default connect(mapStateToProps, { login })(Landing);
