import React, { useEffect, useState } from "react";
// import config from "../../config.json";
import { API_KEY } from "../../config";
import { setTvShowsReducer } from "../../actions/movie";
import { connect } from "react-redux";
// import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, loadCart, getCart } from "../../actions/cart";
import { nextPage, prevPage } from "../../actions/movie";
import SearchBar from "../Search/Search";
import Show from "./Show";
import RelatedMovies from "../Movies/RelatedMovies";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBView,
  MDBAnimation,
  MDBBtn,
  MDBIcon,
} from "mdbreact";
import "../Movies/MovieList.css";

const TvShows = ({
  setTvShowsReducer,
  loadCart,
  isLoading,
  getRelatedMovies,
  tvShows,
  // page,
  nextPage,
  prevPage,
}) => {
  let [page, setPage] = useState(1);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTvShowsReducer(data.results);
        loadCart();  
      });
  }, [page]);

  let shows = (
    <MDBContainer>
      <div className="rmdb-home">
        <div className="rmdb-home-grid">
          <MDBRow>
            {tvShows.map((tvShow, index) => {
              return (
                <MDBCol md="3">
                  <Show
                    index={index}
                    id={tvShow.id}
                    title={tvShow.name}
                    image={tvShow.poster_path}
                    overview={tvShow.overview}
                    tvShowObj={tvShow}
                    price={2.99}
                  />
                </MDBCol>
              );
            })}
          </MDBRow>
        </div>
      </div>
    </MDBContainer>
  );

  return (
    <div>
      <SearchBar />
      {shows}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.userInfo._id,
  isLoading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  tvShows: state.movie.tvShows,
  // page: state.movie.page,
});

export default connect(mapStateToProps, {
  setTvShowsReducer,
  loadCart,
  nextPage,
  prevPage,
})(TvShows);
