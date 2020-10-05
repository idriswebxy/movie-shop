"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prevPage = exports.nextPage = exports.loadMore = exports.fetchApi = exports.setRelatedMovies = exports.loadMovieDetails = exports.getShow = exports.setTvShowsReducer = exports.setMovies = exports.getMovie = exports.getSearchedMovie = exports.loadMovies = exports.getRelatedMovie = exports.setSearchedMovies = void 0;

var _types = require("../actions/types");

var _axios = _interopRequireDefault(require("axios"));

var _config = _interopRequireDefault(require("../config.json"));

var _store = _interopRequireDefault(require("../store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var setSearchedMovies = function setSearchedMovies(movie) {
  return function _callee(dispatch) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              type: _types.SET_SEARCHED_MOVIE,
              payload: movie
            });
            _context.next = 7;
            break;

          case 4:
            _context.prev = 4;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return");

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 4]]);
  };
};

exports.setSearchedMovies = setSearchedMovies;

var getRelatedMovie = function getRelatedMovie(id) {
  return function _callee2(dispatch) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch({
              type: _types.GET_RELATED_MOVIE_ID,
              payload: id
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.getRelatedMovie = getRelatedMovie;

var loadMovies = function loadMovies() {
  return function _callee3(dispatch) {
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(_store["default"].store.getState().movie.length < 20);
            dispatch({
              type: _types.LOAD_MOVIES
            });

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  };
};

exports.loadMovies = loadMovies;

var getSearchedMovie = function getSearchedMovie(id) {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            dispatch({
              type: _types.GET_SEARCHED_MOVIE,
              payload: id
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.getSearchedMovie = getSearchedMovie;

var getMovie = function getMovie(id) {
  return function _callee5(dispatch) {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            try {
              dispatch({
                type: _types.GET_MOVIE,
                payload: id
              });
            } catch (e) {
              dispatch({
                type: _types.GET_MOVIE_ERR
              });
            }

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    });
  };
};

exports.getMovie = getMovie;

var setMovies = function setMovies(api_key) {
  return function _callee6(dispatch) {
    var res, data;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(fetch("https://api.themoviedb.org/3/discover/movie?api_key=".concat(api_key, "&language=en-US&page=", 1)));

          case 2:
            res = _context6.sent;
            _context6.next = 5;
            return regeneratorRuntime.awrap(res.json());

          case 5:
            data = _context6.sent;

            try {
              dispatch({
                type: _types.SET_MOVIES,
                payload: data.results
              });
            } catch (e) {
              dispatch({
                type: _types.SET_MOVIE_ERR,
                payload: e
              });
            }

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    });
  };
};

exports.setMovies = setMovies;

var setTvShowsReducer = function setTvShowsReducer(tvShows) {
  return function _callee7(dispatch) {
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            try {
              dispatch({
                type: _types.SET_TVSHOWS,
                payload: tvShows
              });
            } catch (err) {
              dispatch({
                type: _types.SET_TVSHOWS_ERR,
                payload: err
              });
            }

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    });
  };
};

exports.setTvShowsReducer = setTvShowsReducer;

var getShow = function getShow(id) {
  return function _callee8(dispatch) {
    return regeneratorRuntime.async(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            dispatch({
              type: _types.GET_SHOW,
              payload: id
            });

            try {} catch (e) {
              dispatch({
                type: _types.GET_SHOW_ERR
              });
            }

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    });
  };
};

exports.getShow = getShow;

var loadMovieDetails = function loadMovieDetails() {
  return function _callee9(dispatch) {
    return regeneratorRuntime.async(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            dispatch({
              type: _types.LOAD_MOVIE_DETAILS
            });

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    });
  };
};

exports.loadMovieDetails = loadMovieDetails;

var setRelatedMovies = function setRelatedMovies() {
  return function _callee10(dispatch) {
    var resId;
    return regeneratorRuntime.async(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            _context10.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/movie/genre_id"));

          case 3:
            resId = _context10.sent;
            _context10.next = 6;
            return regeneratorRuntime.awrap(fetch("https://api.themoviedb.org/3/movie/".concat(resId.data, "/similar?api_key=").concat(_config["default"].API_KEY, "&language=en-US&page=1")).then(function (res) {
              return res.json();
            }).then(function (data) {
              var shuffled = data.results.sort(function () {
                return 0.5 - Math.random();
              });
              var selected = shuffled.slice(0, 5);
              dispatch({
                type: _types.SET_RELATED_MOVIES,
                payload: selected
              });
            }));

          case 6:
            _context10.next = 11;
            break;

          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](0);
            console.error(_context10.t0.response);

          case 11:
          case "end":
            return _context10.stop();
        }
      }
    }, null, null, [[0, 8]]);
  };
};

exports.setRelatedMovies = setRelatedMovies;

var fetchApi = function fetchApi() {
  return function _callee11(dispatch) {
    var page, res, data;
    return regeneratorRuntime.async(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            page = _store["default"].store.getState().movie.moviePage;
            _context11.next = 3;
            return regeneratorRuntime.awrap(fetch("https://api.themoviedb.org/3/discover/movie?api_key=".concat(_config["default"].API_KEY, "&language=en-US&page=").concat(page)));

          case 3:
            res = _context11.sent;
            _context11.next = 6;
            return regeneratorRuntime.awrap(res.json());

          case 6:
            data = _context11.sent;
            return _context11.abrupt("return", data.results);

          case 8:
          case "end":
            return _context11.stop();
        }
      }
    });
  };
};

exports.fetchApi = fetchApi;

var loadMore = function loadMore(movies, key) {
  return function _callee12(dispatch) {
    var movies;
    return regeneratorRuntime.async(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            movies = fetchApi();
            dispatch({
              type: _types.SET_MOVIES,
              payload: movies
            }); // dispatch({
            //   type: LOAD_MORE,
            //   payload: data.results.concat(movies)
            // })
            // dispatch({
            //   type: NEXT_PAGE,
            //   payload: ++page
            // })

          case 2:
          case "end":
            return _context12.stop();
        }
      }
    });
  };
};

exports.loadMore = loadMore;

var nextPage = function nextPage(page) {
  return function _callee13(dispatch) {
    return regeneratorRuntime.async(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            dispatch({
              type: _types.NEXT_PAGE,
              payload: page
            });

          case 1:
          case "end":
            return _context13.stop();
        }
      }
    });
  };
};

exports.nextPage = nextPage;

var prevPage = function prevPage(page) {
  return function _callee14(dispatch) {
    return regeneratorRuntime.async(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            page = page === 1 ? page = 2 : page;
            dispatch({
              type: _types.PREV_PAGE,
              payload: page
            });

          case 2:
          case "end":
            return _context14.stop();
        }
      }
    });
  };
};

exports.prevPage = prevPage;