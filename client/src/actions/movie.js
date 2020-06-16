import {
  GET_MOVIE,
  GET_MOVIE_ERR,
  SET_MOVIES,
  SET_MOVIE_ERR,
  SET_SEARCHED_MOVIE,
  GET_SEARCHED_MOVIE,
  LOAD_MOVIE_DETAILS,
  SET_TVSHOWS_ERR,
  SET_TVSHOWS,
  GET_SHOW,
  GET_SHOW_ERR,
  SET_RELATED_MOVIES,
  GET_RELATED_MOVIES,
  SET_GENRE_ID,
  CHANGE_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
  CHANGE_LOAD,
  GET_RELATED_MOVIE_ID,
  GET_MOVIE_VIDEO,
  SET_MOVIE_ID,
} from "../actions/types";
import axios from "axios";
import config from "../config.json";
import { LOCATION_CHANGE } from "connected-react-router";

export const setSearchedMovies = (movie) => async (dispatch) => {
  try {
    dispatch({
      type: SET_SEARCHED_MOVIE,
      payload: movie,
    });
  } catch (e) {
    return;
  }
};

export const getRelatedMovie = (id) => async (dispatch) => {
  dispatch({
    type: GET_RELATED_MOVIE_ID,
    payload: id,
  });
};

export const getSearchedMovie = (id) => async (dispatch) => {
  dispatch({
    type: GET_SEARCHED_MOVIE,
    payload: id,
  });
};

export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MOVIE,
      payload: id,
    });
    dispatch({
      type: SET_MOVIE_ID,
      payload: id,
    });

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=8fb61d9f021e57975ac7a2ef25b640a7&language=en-US`
    )
      .then((res) => res.json())
      .then((data) =>
        dispatch({
          type: GET_MOVIE_VIDEO,
          payload: data.results[0].key,
        })
      );
  } catch (e) {
    dispatch({
      type: GET_MOVIE_ERR,
    });
  }
};

export const setMovies = (movies) => async (dispatch) => {
  try {
    dispatch({
      type: SET_MOVIES,
      payload: movies,
    });
    dispatch({
      type: CHANGE_LOAD,
    });
  } catch (e) {
    dispatch({
      type: SET_MOVIE_ERR,
      payload: e,
    });
  }
};

export const setTvShowsReducer = (tvShows) => async (dispatch) => {
  try {
    dispatch({
      type: SET_TVSHOWS,
      payload: tvShows,
    });
  } catch (e) {
    dispatch({
      type: SET_TVSHOWS_ERR,
    });
  }
};

export const getShow = (id) => async (dispatch) => {
  dispatch({
    type: GET_SHOW,
    payload: id,
  });
  try {
  } catch (e) {
    dispatch({
      type: GET_SHOW_ERR,
    });
  }
};

export const loadMovieDetails = () => async (dispatch) => {
  dispatch({
    type: LOAD_MOVIE_DETAILS,
  });
};

export const setRelatedMovies = () => async (dispatch) => {
  try {
    const resId = await axios.get("/api/movie/genre_id");

    fetch(
      `https://api.themoviedb.org/3/movie/${resId.data}/similar?api_key=${config.API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => {
        let shuffled = data.results.sort(() => 0.5 - Math.random());

        let selected = shuffled.slice(0, 5);

        dispatch({
          type: SET_RELATED_MOVIES,
          payload: selected,
        });
      });
  } catch (error) {
    console.error(error.response.data.errors);
  }
};

export const fetchApi = (key, page) => async (dispatch) => {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&page=${page}`
  )
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: SET_MOVIES,
        payload: data.results,
      });
    });
};

export const nextPage = (page) => async (dispatch) => {
  dispatch({
    type: NEXT_PAGE,
    payload: page,
  });
};

export const prevPage = (page) => async (dispatch) => {
  page = page === 1 ? (page = 2) : page;

  dispatch({
    type: PREV_PAGE,
    payload: page,
  });
};

// export const getMovieVideo = (id) => async (dispatch) => {
//   try {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${id}/videos?api_key=8fb61d9f021e57975ac7a2ef25b640a7&language=en-US`
//     )
//       .then((res) => res.json())
//       .then((data) =>
//         dispatch({
//           type: GET_MOVIE_VIDEO,
//           payload: data.results[0].key,
//         })
//       );
//   } catch (error) {}
// };
