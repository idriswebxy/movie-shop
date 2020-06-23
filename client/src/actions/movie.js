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
  SET_VIDEO_KEY,
  SET_MOVIE_ID,
  SET_MOVIE_IDS,
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

    // await axios.post("/movies", id);


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

export const setMovies = (movies) => async (dispatch) => {
  try {
    dispatch({
      type: SET_MOVIES,
      payload: movies,
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

    await fetch(
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
    console.error(error.response);
  }
};

export const fetchApi = (key, page) => async (dispatch) => {
  let res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&page=${page}`
  );

  let data = await res.json();

  dispatch({
    type: SET_MOVIES,
    payload: data.results,
  });
  dispatch(setMoviesDB(data.results));
};

export const setMoviesDB = (movies) => async (dispatch) => {
  try {
    const res = await axios.post("/api/movie/movies", movies);

  } catch (error) {}
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

// export const getMovieVideo = (movies) => async (dispatch) => {

//   let arr = movies

//   arr.forEach(m => dispatch({
//     type: SET_VIDEO_KEY,

//   }))

//   let res = await fetch(
//     `https://api.themoviedb.org/3/movie/${null}/videos?api_key=${config.API_KEY}&language=en-US`
//   );

//   let data = await res.json();

//   dispatch({
//     type: SET_VIDEO_KEY,
//     payload: data.results[0].key,
//   });
// };

// export const changeLoad = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: CHANGE_LOAD,
//       payload: true,
//     });
//   } catch (error) {}
// };
