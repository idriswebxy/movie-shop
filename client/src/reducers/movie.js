import {
  GET_MOVIE,
  GET_MOVIE_ERR,
  SET_MOVIES,
  CHANGE_LOAD,
  SET_MOVIE_ERR,
  SET_SEARCHED_MOVIE,
  CLEAR_MOVIE,
  GET_SEARCHED_MOVIE,
  LOAD_MOVIE_DETAILS,
  SET_TVSHOWS_ERR,
  SET_TVSHOWS,
  GET_SHOW,
  SET_RELATED_MOVIES,
  SET_GENRE_ID,
  PREV_PAGE,
  NEXT_PAGE,
  GET_RELATED_MOVIE_ID,
  SET_VIDEO_KEY,
  SET_MOVIE_ID,
} from "../actions/types";

const initialState = {
  isLoading: true,
  movies: [],
  tvShows: [],
  searchedMovie: null,
  searchedShow: null,
  relatedMovie: null,
  relatedMovies: [],
  relatedId: null,
  videoKey: "",
  movieId: null,
  page: 1,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MOVIE:
      return {
        ...state,
        searchedMovie: state.movies.find((movie) => movie.id === payload),
      };
    case SET_MOVIE_ID:
      return {
        ...state,
        movieId: payload,
      };
    case GET_SHOW:
      return {
        ...state,
        searchedShow: state.tvShows.find((show) => show.id === payload),
        isLoading: false,
      };
    case GET_SEARCHED_MOVIE:
      return {
        ...state,
        searchedMovie: state.searchedMovie.find(
          (movie) => movie.id === payload
        ),
      };
    case GET_RELATED_MOVIE_ID:
      return {
        ...state,
        searchedMovie: state.relatedMovies.find(
          (movie) => movie.id === payload
        ),
      };
    case CLEAR_MOVIE:
      return {
        ...state,
        searchedMovie: null,
      };
    case SET_RELATED_MOVIES:
      return {
        ...state,
        relatedMovies: payload,
      };
    case SET_TVSHOWS_ERR:
    case GET_MOVIE_ERR:
      return;
    case SET_SEARCHED_MOVIE:
      return {
        ...state,
        searchedMovie: payload,
      };
    case SET_TVSHOWS:
      return {
        ...state,
        tvShows: payload,
        isLoading: false,
      };
    case SET_GENRE_ID:
      return {
        ...state,
        relatedId: payload,
      };
    case SET_MOVIES:
      return {
        ...state,
        movies: payload,
        isLoading: false,
      };
    case SET_MOVIE_ERR:
      return null;
    case LOAD_MOVIE_DETAILS:
      return {
        ...state,
        searchedMovie: payload,
        isLoading: false,
        currentMovie: payload,
      };
    case NEXT_PAGE:
      return {
        ...state,
        page: payload + 1,
      };
    case PREV_PAGE:
      return {
        ...state,
        page: payload - 1,
      };
    case CHANGE_LOAD:
      return {
        ...state,
        isLoading: false,
      };
    case SET_VIDEO_KEY:
      return {
        ...state,
        videoKey: payload
      };
    default:
      return state;
  }
}
