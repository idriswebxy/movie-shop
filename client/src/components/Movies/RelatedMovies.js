import React, { useEffect, useState } from "react";
import config from "../../config.json";
import { connect } from "react-redux";
import { setRelatedMovies, getRelatedMovie } from "../../actions/movie";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";

const RelatedMovies = ({
  movieId,
  setRelatedMovies,
  relatedMovies,
  getRelatedId,
  page,
  id,
  isLoading,
  getRelatedMovie,
}) => {
  useEffect(() => {
    setRelatedMovies();
  }, [page]);

  return (
    <MDBContainer>
      <div style={{ paddingBottom: "40px" }}>
        <h2 style={{ textAlign: "center", margin: "30px" }}>Recommendations</h2>
        <MDBRow>
          {relatedMovies.map((movie, id) => (
            <div style={{ margin: "20px" }} key={id}>
              <Link
                to={"/movieInfo/" + movie.id}
                onClick={() => getRelatedMovie(movie.id)}
              >
                <img
                  className="d-block w-5"
                  alt="First slide"
                  src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
                />
              </Link>
            </div>
          ))}
        </MDBRow>
      </div>
    </MDBContainer>
  );
};

const mapStateToProps = (state) => ({
  relatedMovies: state.movie.relatedMovies,
  page: state.movie.page,
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { setRelatedMovies, getRelatedMovie })(
  RelatedMovies
);
