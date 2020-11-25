import React, { useEffect, useState } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdbreact";
import "./Landing.css";
import "../MainImage/MainImage.css";
import { slides } from "../../utils/movie_slides";
import "../../App.css";
import { connect } from "react-redux";



const Landing = ({ movies }) => {
  let [index, setIndex] = useState(0);

  // const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();


  useEffect(() => {
    slideTimer();

  }, []);

  const slideTimer = () => {
    // setInterval(() => {
    //   setIndex(++index);
    //   if (index === 19) {
    //     index = 0;
    //   } else {
    //     return;
    //   }
    // }, 4000);
  };

  return (
    <div className="app-main">
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form>
              <p className="h4 text-center mb-4">Sign in</p>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your email
              </label>
              <input
                type="email"
                id="defaultFormLoginEmailEx"
                className="form-control"
              />
              <br />
              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                Your password
              </label>
              <input
                type="password"
                id="defaultFormLoginPasswordEx"
                className="form-control"
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
  movies: state.movie.movies,
});

export default connect(mapStateToProps)(Landing);
