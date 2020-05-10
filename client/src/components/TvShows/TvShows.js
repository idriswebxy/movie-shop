import React, { useEffect, useState } from "react";
import config from "../../config.json";
import { setTvShowsReducer } from "../../actions/movie";
import { connect } from "react-redux";
import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, loadCart, getCart } from "../../actions/cart";
import SearchPage from "../Search/Search";
import Show from "./Show";
import RelatedMovies from "../Movies/RelatedMovies";
import { MDBContainer, MDBRow, MDBCol, MDBView } from "mdbreact";

const TvShows = ({
  setTvShowsReducer,
  loadCart,
  isLoading,
  getRelatedMovies,
  tvShows,
}) => {
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${config.API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        setTvShowsReducer(data.results);
        loadCart();
      });
  }, []);

  if (isLoading) {
    return <SpinnerPage />;
  }

  let shows = (
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
  );

  return (
    <div>
      <SearchPage />
      <MDBContainer>
       {shows}
      </MDBContainer>

      <RelatedMovies />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userId: state.auth.userInfo._id,
  isLoading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  tvShows: state.movie.tvShows,
});

export default connect(mapStateToProps, {
  setTvShowsReducer,
  loadCart,
})(TvShows);
