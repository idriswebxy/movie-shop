import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie } from "../../actions/movie";
import SpinnerPage from "../Layout/SpinnerPage";


const Movie = ({ id, image, getMovie, isLoading }) => {

  // useEffect(() => {
    
   // }, [])


  return (
    <Link to="/movie_details" onClick={() => getMovie(id)}>
      <img
        className="movie-container"
        src={`http://image.tmdb.org/t/p/w342${image}`}
      />
    </Link>
  );
};

const mapStateToProps = state => ({
  isLoading: state.movie.isLoading
})

export default connect(mapStateToProps, { getMovie })(Movie);
