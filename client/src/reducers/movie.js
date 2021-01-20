import {
  GET_MOVIE,
  GET_MOVIE_ERR,
  FETCH_MOVIES,
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
  SET_MOVIE_IDS,
  LOAD_MORE,
  LOAD_MOVIES,
  LOAD_CHANGE,
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
  moviePage: 1,
  totalPages: 0,
  tvShowPage: 1,
  totalShowPages: 0,
  movieIds: [],
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_CHANGE:
      return {
        ...state,
        isLoading: true,
      };
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
      return {
        error: payload,
      };
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
        tvShows: [...state.tvShows, ...payload.results],
        totalShowPages: payload.total_pages, 
        tvShowPage: payload.page,
        isLoading: false,
      };
    case SET_GENRE_ID:
      return {
        ...state,
        relatedId: payload,
      };
    case FETCH_MOVIES:
      return {
        ...state,
        movies: [...state.movies, ...payload.results],
        totalPages: payload.total_pages,
        moviePage: payload.page,
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
        moviePage: payload,
      };
    case PREV_PAGE:
      return {
        ...state,
        moviePage: payload - 1,
      };
    case CHANGE_LOAD:
      return {
        ...state,
        isLoading: true,
      };
    case SET_VIDEO_KEY:
      return {
        ...state,
        videoKey: payload,
      };
    case SET_MOVIE_IDS:
      return {
        ...state,
        movieIds: state.movieIds.push(payload),
      };
    case LOAD_MORE:
      return {
        ...state,
        movies: state.movies.concat(payload),
      };
    case LOAD_MOVIES:
      return {
        ...state,
        movies: state.movies.map((m) => m),
      };
    default:
      return state;
  }
}
