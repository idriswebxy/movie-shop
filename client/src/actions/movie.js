import {
  GET_MOVIES,
  GET_MOVIE_ERR,
  SET_MOVIES,
  SET_MOVIE_ERR,
  SET_SEARCHED_MOVIE,
  GET_SEARCHED_MOVIE,
  LOAD_MOVIE_DETAILS
} from "../actions/types";
import axios from "axios";

export const setSearchedMovies = movie => async dispatch => {
  try {
    dispatch({
      type: SET_SEARCHED_MOVIE,
      payload: movie
    });
  } catch (e) {
    return;
  }
};

export const getSearchedMovie = id => async dispatch => {
  dispatch({
    type: GET_SEARCHED_MOVIE,
    payload: id
  });
};

export const getMovie = id => async dispatch => {
  try {
    dispatch({
      type: GET_MOVIES,
      payload: id
    });
  } catch (e) {
    dispatch({
      type: GET_MOVIE_ERR
    });
  }
};

export const setMovie = movies => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    dispatch({
      type: SET_MOVIES,
      payload: movies
    });
  } catch (e) {
    dispatch({
      type: SET_MOVIE_ERR
    });
  }
};

export const loadMovieDetails = () => async dispatch => {
  dispatch({
    type: LOAD_MOVIE_DETAILS
  });
};
