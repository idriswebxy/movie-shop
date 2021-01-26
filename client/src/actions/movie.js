import {
  GET_MOVIE,
  GET_MOVIE_ERR,
  FETCH_MOVIES,
  SET_MOVIE_ERR,
  SET_SEARCHED_MOVIE,
  GET_SEARCHED_MOVIE,
  LOAD_MOVIE_DETAILS,
  SET_TVSHOWS_ERR,
  SET_TVSHOWS,
  GET_SHOW,
  GET_SHOW_ERR,
  SET_RELATED_MOVIES,
  NEXT_PAGE,
  PREV_PAGE,
  GET_RELATED_MOVIE_ID,
  LOAD_MORE,
  LOAD_MOVIES,
  LOAD_CHANGE,
} from "../actions/types";
import axios from "axios";
import store from "../store";
import { API_URL, API_KEY } from "../config.js";

// let movieStore = store.store.getState().movie;

// let apiKey = config.API_KEY;

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

export const loadMovies = (endpoint) => async (dispatch) => {

  dispatch({
    type: LOAD_MOVIES,
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
  } catch (e) {
    dispatch({
      type: GET_MOVIE_ERR,
    });
  }
};

export const loadChange = (loadStatus) => async (dispatch) => {
  dispatch({
    type: LOAD_CHANGE,
    payload: loadStatus,
  });
};

export const loadMoreItems = (endpoint, page) => async (dispatch) => {
  endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
    page + 1
  }`;

  dispatch(fetchItems(endpoint));
};

export const loadMoreTvShows = (endpoint, page) => async (dispatch) => {
  endpoint = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${
    page + 1
  }`;

  dispatch(setTvShows(endpoint));
};

export const fetchItems = (endpoint) => async (dispatch) => {
  let res = await fetch(endpoint);
  let data = await res.json();

  try {
    // set total_pages
    dispatch({
      type: FETCH_MOVIES,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: SET_MOVIE_ERR,
      payload: e,
    });
  }
};

export const setTvShows = (endpoint) => async (dispatch) => {
  let res = await fetch(endpoint);
  let data = await res.json();

  try {
    dispatch({
      type: SET_TVSHOWS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: SET_TVSHOWS_ERR,
      payload: err,
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

    await fetch(
      `https://api.themoviedb.org/3/movie/${resId.data}/similar?api_key=${API_KEY}&language=en-US&page=1`
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
    console.error(error.response);
  }
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
