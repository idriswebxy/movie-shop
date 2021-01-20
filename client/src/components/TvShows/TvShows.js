import React, { useEffect, useState } from "react";
// import config from "../../config.json";
import { API_KEY } from "../../config";
import { setTvShows } from "../../actions/movie";
import { connect } from "react-redux";
// import SpinnerPage from "../Layout/SpinnerPage";
import { addToCart, loadCart, getCart } from "../../actions/cart";
import { loadMoreTvShows } from "../../actions/movie";
import SearchBar from "../Search/Search";
import Show from "./Show";
import RelatedMovies from "../Movies/RelatedMovies";
import Spinner from "../Spinner/Spinner";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { useAuth0 } from "@auth0/auth0-react";
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
  setTvShows,
  loadCart,
  loading,
  tvShows,
  page,
  loadMoreTvShows,
  totalPages
}) => {
  const { isLoading } = useAuth0();

  let endpoint = "";

  useEffect(() => {
    if (tvShows.length <= 20) {
      endpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&page=1`;
      setTvShows(endpoint);
      loadCart();
    } else {
      loadCart();
    }
  }, []);

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
          {loading || isLoading ? <Spinner /> : null}
          {page <= totalPages && (!isLoading || loading) ? (
            <LoadMoreBtn
              text="Load More"
              onClick={() => loadMoreTvShows(endpoint, page)}
            />
          ) : null}
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
  // userId: state.auth.userInfo._id,
  loading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  tvShows: state.movie.tvShows,
  page: state.movie.tvShowPage,
  totalPages: state.movie.totalShowPages,
});

export default connect(mapStateToProps, {
  setTvShows,
  loadCart,
  loadMoreTvShows,
})(TvShows);
