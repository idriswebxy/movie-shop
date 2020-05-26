import React, { useEffect, useState } from "react";
import config from "../../config.json";
import { connect } from "react-redux";
import { setRelatedMovies, getRelatedId } from "../../actions/movie";

const RelatedMovies = ({
  movieId,
  setRelatedMovies,
  relatedMovies,
  getRelatedId,
  page
}) => {
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${
        config.API_KEY
      }&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setRelatedMovies(data.results));
  }, [page]);

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
        <div className="related-movies-inner-elements">
          {list.props.children[5]}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movieId: state.movie.relatedId,
  relatedMovies: state.movie.relatedMovies,
  page: state.movie.page
});

export default connect(mapStateToProps, { setRelatedMovies, getRelatedId })(
  RelatedMovies
);
