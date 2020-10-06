import React, { useEffect, useState } from "react";
// import config from "../../config.json";
import { API_KEY } from "../../config";
import { setTvShowsReducer } from "../../actions/movie";
import { connect } from "react-redux";
// import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, loadCart, getCart } from "../../actions/cart";
import { nextPage, prevPage } from "../../actions/movie";
import SearchPage from "../Search/Search";
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
import { set } from "mongoose";

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

  // if (isLoading) {
  //   return <Spinner />;
  // }

  // page transition
  let pages = (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <MDBBtn
          onClick={() => setPage(page === 1 ? (page = 1) : page - 1)}
          className="page-item"
        >
          <MDBIcon
            className="white-text pr-3"
            size="2x"
            icon="angle-double-left"
          />
        </MDBBtn>
        &nbsp; &nbsp; &nbsp; Page: {page} &nbsp; &nbsp; &nbsp; &nbsp;
        <MDBBtn onClick={() => setPage(page + 1)} className="page-item">
          <MDBIcon
            className="white-text pr-3"
            size="2x"
            icon="angle-double-right"
          />
        </MDBBtn>
      </ul>
    </nav>
  );

  let shows = (
    <MDBRow>
      {tvShows.map((tvShow, key) => {
        return (
          <MDBCol key={key} size="3">
            <Show
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
  );

  return (
    <div>
      <SearchPage />
      <MDBContainer>{shows}</MDBContainer>
      <RelatedMovies />
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
