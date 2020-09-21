import React, { useEffect, useState } from "react";
import config from "../../config.json";
import { setTvShowsReducer } from "../../actions/movie";
import { connect } from "react-redux";
import SpinnerPage from "../Layout/SpinnerPage";
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
  page,
  nextPage,
  prevPage,
}) => {
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${config.API_KEY}&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTvShowsReducer(data.results);
        loadCart();
      });
  }, [page]);

  if (isLoading) {
    return <SpinnerPage />;
  }

  // page transition
  let pages = (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <MDBBtn
          // to={`/movies/${page}`}
          onClick={() => prevPage(page)}
          className="page-item"
        >
          <MDBIcon
            className="white-text pr-3"
            size="2x"
            icon="angle-double-left"
          />
        </MDBBtn>
        &nbsp; &nbsp; &nbsp; Page: {page} &nbsp; &nbsp; &nbsp; &nbsp;
        <MDBBtn onClick={() => nextPage(page)} className="page-item">
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
    <MDBAnimation type="zoomIn" duration="1s">
      <MDBRow>
        {tvShows.map((tvShow, key) => {
          return (
            <MDBCol key={key} size="3">
              <div className="hover-movie">
                <Show
                  id={tvShow.id}
                  title={tvShow.name}
                  image={tvShow.poster_path}
                  overview={tvShow.overview}
                  tvShowObj={tvShow}
                  price={2.99}
                />
              </div>
            </MDBCol>
          );
        })}
      </MDBRow>
    </MDBAnimation>
  );



  return (
    <div>
      <SearchPage />
      <div className="pagination">{pages}</div>
      <MDBContainer>{shows}</MDBContainer>
      <div className="pagination">{pages}</div>
      <RelatedMovies />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.userInfo._id,
  isLoading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  tvShows: state.movie.tvShows,
  page: state.movie.page,
});

export default connect(mapStateToProps, {
  setTvShowsReducer,
  loadCart,
  nextPage,
  prevPage,
})(TvShows);
