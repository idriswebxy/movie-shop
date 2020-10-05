"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _types = require("../actions/types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
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
  tvShowPage: 1,
  movieIds: [],
  error: null
};

function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var type = action.type,
      payload = action.payload;

  switch (type) {
    case _types.GET_MOVIE:
      return _objectSpread({}, state, {
        searchedMovie: state.movies.find(function (movie) {
          return movie.id === payload;
        })
      });

    case _types.SET_MOVIE_ID:
      return _objectSpread({}, state, {
        movieId: payload
      });

    case _types.GET_SHOW:
      return _objectSpread({}, state, {
        searchedShow: state.tvShows.find(function (show) {
          return show.id === payload;
        }),
        isLoading: false
      });

    case _types.GET_SEARCHED_MOVIE:
      return _objectSpread({}, state, {
        searchedMovie: state.searchedMovie.find(function (movie) {
          return movie.id === payload;
        })
      });

    case _types.GET_RELATED_MOVIE_ID:
      return _objectSpread({}, state, {
        searchedMovie: state.relatedMovies.find(function (movie) {
          return movie.id === payload;
        })
      });

    case _types.CLEAR_MOVIE:
      return _objectSpread({}, state, {
        searchedMovie: null
      });

    case _types.SET_RELATED_MOVIES:
      return _objectSpread({}, state, {
        relatedMovies: payload
      });

    case _types.SET_TVSHOWS_ERR:
      return {
        error: payload
      };

    case _types.GET_MOVIE_ERR:
      return;

    case _types.SET_SEARCHED_MOVIE:
      return _objectSpread({}, state, {
        searchedMovie: payload
      });

    case _types.SET_TVSHOWS:
      return _objectSpread({}, state, {
        tvShows: payload,
        isLoading: false
      });

    case _types.SET_GENRE_ID:
      return _objectSpread({}, state, {
        relatedId: payload
      });

    case _types.SET_MOVIES:
      return _objectSpread({}, state, {
        movies: payload,
        isLoading: false
      });

    case _types.SET_MOVIE_ERR:
      return null;

    case _types.LOAD_MOVIE_DETAILS:
      return _objectSpread({}, state, {
        searchedMovie: payload,
        isLoading: false,
        currentMovie: payload
      });

    case _types.NEXT_PAGE:
      return _objectSpread({}, state, {
        moviePage: payload
      });

    case _types.PREV_PAGE:
      return _objectSpread({}, state, {
        moviePage: payload - 1
      });

    case _types.CHANGE_LOAD:
      return _objectSpread({}, state, {
        isLoading: true
      });

    case _types.SET_VIDEO_KEY:
      return _objectSpread({}, state, {
        videoKey: payload
      });

    case _types.SET_MOVIE_IDS:
      return _objectSpread({}, state, {
        movieIds: state.movieIds.push(payload)
      });

    case _types.LOAD_MORE:
      return _objectSpread({}, state, {
        movies: state.movies.concat(payload)
      });

    case _types.LOAD_MOVIES:
      return _objectSpread({}, state, {
        movies: state.movies.map(function (m) {
          return m;
        }),
        isLoading: false
      });

    default:
      return state;
  }
}