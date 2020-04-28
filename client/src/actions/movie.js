import {
  GET_MOVIES,
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
  CHANGE_PAGE
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



export const setMovies = movies => async dispatch => {
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



export const setTvShowsReducer = tvShows => async dispatch => {
  try {
    dispatch({
      type: SET_TVSHOWS,
      payload: tvShows
    });
  } catch (e) {
    dispatch({
      type: SET_TVSHOWS_ERR
    });
  }
};



export const getShow = id => async dispatch => {
  try {
    dispatch({
      type: GET_SHOW,
      payload: id
    });
  } catch (e) {
    dispatch({
      type: GET_SHOW_ERR
    });
  }
};



export const loadMovieDetails = () => async dispatch => {
  dispatch({
    type: LOAD_MOVIE_DETAILS
  });
};



export const setRelatedMovies = movies => async dispatch => {
  try {

    const res = await axios.post("/api/movie", movies);

    console.log(res.data)
    
    dispatch({
      type: SET_RELATED_MOVIES,
      payload: res.data
    });
  } catch (error) {
    // console.log(error.response.data.errors)
  }
};



export const getRelatedId = () => async dispatch => {

  try {
    const res = await axios.get("/api/movie/genre_id");

    console.log(res.data)

    dispatch({
      type: SET_GENRE_ID,
      payload: res.data
    })


  } catch (error) {}
};


export const getMovieVideo = () => async dispatch => {

  try {
    

  } catch (error) {
    
  }

}
