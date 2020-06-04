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
  MDBListGroupItem,
  MDBRow,
} from "mdbreact";
import { Scrollbars } from "react-custom-scrollbars";

const SearchResults = ({ results, getMovie, isLoading, getSearchedMovie }) => {
  // useEffect(() => {
  //   clearCache();
  // }, []);

  results = results.slice(0, 10);

  let searchResults = (
    <MDBContainer>
      <Scrollbars style={{ width: 700, height: 350 }}>
        {results && results.length !== 0 ? (
          results.map((result) => (
            <MDBListGroup style={{ width: "30rem" }}>
              <MDBRow>
                <MDBCol>
                  <Link
                    to="/movie_details"
                    onClick={() => getSearchedMovie(result.id)}
                  >
                    <div
                      key={result.id}
                      style={{
                        color: "white",
                        display: "block",
                        padding: "20px",
                      }}
                    >
                      <img
                        style={{ width: "5rem" }}
                        src={`https://image.tmdb.org/t/p/w154${[
                          result.poster_path,
                        ]}`}
                      />
                      <MDBCol>
                        {result.title}
                        {` (${
                          result.release_date
                            ? moment(result.release_date).format("YYYY")
                            : "N/A"
                        })`}
                      </MDBCol>
                    </div>
                  </Link>
                </MDBCol>
              </MDBRow>
            </MDBListGroup>
          ))
        ) : (
          <div>
            <div>No results found...</div>
          </div>
        )}
      </Scrollbars>
    </MDBContainer>
  );

  return <div>{searchResults}</div>;
};

const mapStateToProps = (state) => ({
  isLoading: state.movie.isLoading,
});

export default connect(mapStateToProps, { getMovie, getSearchedMovie })(
  SearchResults
);
