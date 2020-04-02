import React, { useEffect, useState } from "react";
import config from "../../config.json";
import { setTvShowsReducer } from "../../actions/movie";
import { connect } from "react-redux";
import SpinnerPage from "../../components/Layout/SpinnerPage";
import { addToCart, loadCart, getCart } from "../../actions/cart";
import SearchPage from "../Search/Search";
import Show from "../Movies/Show";
import RelatedMovies from "./RelatedMovies";
import { MDBContainer, MDBRow, MDBCol, MDBView } from "mdbreact";

const TvShows = ({
  setTvShowReducer,
  addToCart,
  loadCart,
  isLoading,
  getRelatedMovies
}) => {
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${config.API_KEY}&language=en-US&page=1`
    )
      .then(res => res.json())
      .then(data => {
        setTvShowsReducer(data.results);
        setTvShows([...tvShows, data.results]);
        loadCart();
      })
      .then(data => console.log(data))
  }, []);

  if (isLoading) {
    return <SpinnerPage />;
  }

  return (
    <div>
      <SearchPage />
      <MDBContainer>
        <MDBRow>
          {tvShows.map((tvShow, key) => {
            return (
              <MDBCol key={key} size="6">
                <div className="hover-movie">
                  <Show
                    id={tvShow.id}
                    addToCart={addToCart}
                    title={tvShow.title}
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
      </MDBContainer>

      <RelatedMovies />
    </div>
  );
};

const mapStateToProps = state => ({
  userId: state.auth.userInfo._id,
  isLoading: state.movie.isLoading,
  authenticated: state.auth.authenticated,
  tvShows: state.movie.tvShows
});

export default connect(mapStateToProps, { setTvShowsReducer, loadCart, addToCart })(TvShows);
