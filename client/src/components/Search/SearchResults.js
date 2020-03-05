import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMovie, getSearchedMovie } from "../../actions/movie";
import moment from "moment";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBIcon,
  MDBContainer,
  MDBListGroup,
  MDBListGroupItem
} from "mdbreact";

const SearchResults = ({ results, getMovie, isLoading, getSearchedMovie }) => {
  // useEffect(() => {
  //   clearCache();
  // }, []);

  results = results.slice(0, 10);

  return ( 
    <div>
      <MDBContainer>
        {results && results.length !== 0 ? (
          results.map(result => (
            <MDBListGroup style={{ width: "30rem" }}>
              <Link
                to="/movie_details"
                onClick={() => getSearchedMovie(result.id)}
              >
                <MDBListGroupItem>
                  <div
                    key={result.id}
                    style={{ color: "black", display: "flex" }}
                  >
                    <MDBCardImage
                      style={{ width: "3rem" }}
                      src={`https://image.tmdb.org/t/p/w92${[
                        result.poster_path
                      ]}`}
                    />

                    {result.title}
                    {` (${
                      result.release_date
                        ? moment(result.release_date).format("YYYY")
                        : "N/A"
                    })`}
                  </div>
                </MDBListGroupItem>
              </Link>
            </MDBListGroup>
          ))
        ) : (
          <div>
            <div>No results found...</div>
          </div>
        )}
      </MDBContainer>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: state.movie.isLoading
});

export default connect(mapStateToProps, { getMovie, getSearchedMovie })(
  SearchResults
);
