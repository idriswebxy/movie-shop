"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPriceTotal = exports.deleteItem = exports.loadCart = exports.addToCartTvShow = exports.addToCart = void 0;

var _types = require("./types");

var _axios = _interopRequireDefault(require("axios"));

var _alert = require("./alert");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addToCart = function addToCart(movie, key) {
  return function _callee(dispatch) {
    var config, body, res;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(key);
            config = {
              headers: {
                "Content-Type": "application/json"
              }
            }; // movie.price = 2.99;

            body = JSON.stringify(movie);
            _context.prev = 3;
            _context.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/cart", body, config));

          case 6:
            res = _context.sent;
            dispatch({
              type: _types.ADD_TO_CART,
              payload: res.data
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](3);
            dispatch({
              type: _types.CART_ERROR
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[3, 10]]);
  };
};

exports.addToCart = addToCart;

var addToCartTvShow = function addToCartTvShow(item) {
  return function _callee2(dispatch) {
    var config, body, res;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            config = {
              headers: {
                "Content-Type": "application/json"
              }
            };
            body = JSON.stringify(item);
            _context2.prev = 2;
            _context2.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/cart/tv_show", body, config));

          case 5:
            res = _context2.sent;
            dispatch({
              type: _types.ADD_TO_CART,
              payload: res.data
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            dispatch({
              type: _types.CART_ERROR
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[2, 9]]);
  };
};

exports.addToCartTvShow = addToCartTvShow;

var loadCart = function loadCart() {
  return function _callee3(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/cart"));

          case 3:
            res = _context3.sent;
            dispatch({
              type: _types.LOAD_CART,
              payload: res.data
            });
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            dispatch({
              type: _types.CART_ERROR
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.loadCart = loadCart;

var deleteItem = function deleteItem(id, key) {
  return function _callee4(dispatch) {
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("api/cart/".concat(id)));

          case 3:
            dispatch({
              type: _types.DELETE_ITEM,
              payload: key
            });
            dispatch((0, _alert.setAlert)("Item Removed", "success"));
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            dispatch({
              type: _types.CART_ERROR,
              payload: {
                msg: _context4.t0.response.statusText,
                status: _context4.t0.response.status
              }
            });

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.deleteItem = deleteItem;

var getPriceTotal = function getPriceTotal(id) {
  return function _callee5(dispatch) {
    var res;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/cart/total/".concat(id)));

          case 3:
            res = _context5.sent;
            dispatch({
              type: _types.PRICE_TOTAL,
              payload: res.data
            });
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 7]]);
  };
};

exports.getPriceTotal = getPriceTotal;