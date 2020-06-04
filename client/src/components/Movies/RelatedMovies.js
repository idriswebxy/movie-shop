import React, { useEffect, useState } from "react";
import config from "../../config.json";
import { connect } from "react-redux";
import { setRelatedMovies, getRelatedId, getRelatedMovie } from "../../actions/movie";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Link } from "react-router-dom";

const RelatedMovies = ({
  movieId,
  setRelatedMovies,
  relatedMovies,
  getRelatedId,
  page,
  id
}) => {
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${config.API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setRelatedMovies(data.results));
  }, [page, movieId]);


  var list = (
    <div>
      {relatedMovies.map((movie, id) => (
        <div key={id}>
          <Link to="/movie_details" onClick={() => getRelatedMovie(movie.id)}>
            <img
              className="d-block w-5"
              alt="First slide"
              src={`http://image.tmdb.org/t/p/w185${movie.poster_path}`}
            />
          </Link>
        </div>
      ))}
    </div>
  );

  return (
    <MDBContainer>
      <div style={{ paddingBottom: "40px" }}>
        <h2 style={{ textAlign: "center", margin: "50px" }}>Recommendations</h2>
        <MDBRow>
          <MDBCol>{list.props.children[0]}</MDBCol>
          <MDBCol>{list.props.children[1]}</MDBCol>
          <MDBCol>{list.props.children[2]}</MDBCol>
          <MDBCol>{list.props.children[3]}</MDBCol>
          <MDBCol>{list.props.children[4]}</MDBCol>
          <MDBCol>{list.props.children[5]}</MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
};

const mapStateToProps = (state) => ({
  movieId: state.movie.relatedId,
  relatedMovies: state.movie.relatedMovies,
  page: state.movie.page,
});

export default connect(mapStateToProps, { setRelatedMovies, getRelatedId })(
  RelatedMovies
);
