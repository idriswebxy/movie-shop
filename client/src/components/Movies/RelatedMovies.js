import React, { useEffect, useState } from "react";
import config from "../../config.json";
import { connect } from "react-redux";
import { setRelatedMovies, getRelatedId } from "../../actions/movie";

const RelatedMovies = ({
  movieId,
  setRelatedMovies,
  relatedMovies,
  getRelatedId,
}) => {
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${19}/recommendations?api_key=${
        config.API_KEY
      }&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setRelatedMovies(data.results));
    getRelatedId();
  }, []);

  var list = (
    <div>
      {relatedMovies.map((movie, id) => (
        <div key={id}>
          <img
            className="d-block w-5"
            alt="First slide"
            src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h2>Related Movies</h2>
      <div className="related-movies-outerLayer">
        <div className="related-movies-inner-elements">
          {list.props.children[0]}
        </div>
        <div className="related-movies-inner-elements">
          {list.props.children[1]}
        </div>
        <div className="related-movies-inner-elements">
          {list.props.children[2]}
        </div>
        <div className="related-movies-inner-elements">
          {list.props.children[3]}
        </div>
        <div className="related-movies-inner-elements">
          {list.props.children[4]}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movieId: state.cart.cart.genreId,
  relatedMovies: state.movie.relatedMovies,
});

export default connect(mapStateToProps, { setRelatedMovies, getRelatedId })(
  RelatedMovies
);
