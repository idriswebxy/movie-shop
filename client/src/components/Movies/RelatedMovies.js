import React, { useEffect } from "react";
import config from "../../config.json";
import { connect } from "react-redux";

const RelatedMovies = ({ movieId }) => {

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${10749}/recommendations?api_key=${config.API_KEY}&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(data => console.log(data));
      console.log(movieId.map(movie => console.log(movie)))
  }, []);

  return <div style={{ padding: "10%" }}>Related Movies..</div>;
};

const mapStateToProps = state => ({
  movieId: state.cart.cart
});


export default connect(mapStateToProps)(RelatedMovies);
