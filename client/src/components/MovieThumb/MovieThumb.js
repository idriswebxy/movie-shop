import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./MovieThumb.css";
import { MDBBtn, MDBCol, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import { addToCart } from "../../actions/cart";
import { connect } from "react-redux";




const MovieThumb = (props, { addToCart, movieObj }) => {

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <MDBContainer>
      <MDBRow>
          <div className="rmdb-moviethumb">
            {props.clickable ? (
              <Link
                to={{
                  pathname: `/${props.movieId}`,
                  movieName: `${props.movieName}`,
                }}
              >
                <img src={props.image} alt="moviethumb" />
              </Link>
            ) : (
              <img src={props.image} alt="moviethumb" />
            )}
          </div>
      </MDBRow>
    </MDBContainer>
  );
};

MovieThumb.propTypes = {
  image: PropTypes.string,
  movieId: PropTypes.number,
  movieName: PropTypes.string,
};


const mapStateToProps = (state) => ({
  movieObj: state.movie.searchedMovie,
});

export default connect(mapStateToProps, { addToCart })(MovieThumb);
