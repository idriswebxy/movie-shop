"use strict";

var express = require("express");

var router = express.Router();

var Cart = require("../../models/Cart");

var User = require("../../models/User");

var auth = require("../../middleware/auth"); // returns total price in cart


router.get("/total/:id", auth, function _callee(req, res) {
  var sum, cartTotal;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          sum = 0.00;
          _context.next = 4;
          return regeneratorRuntime.awrap(Cart.find({
            user: req.params.id
          }));

        case 4:
          cartTotal = _context.sent;
          cartTotal.map(function (m) {
            sum = m.price + sum;
          });
          res.json(sum);
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send("Server Error...");

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}); // Get users cart

router.get("/", auth, function _callee2(req, res) {
  var items;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Cart.find({
            user: req.user.id
          }));

        case 3:
          items = _context2.sent;
          res.json(items.map(function (item) {
            return item.movie;
          }));
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message);
          res.status(500).send("Server Error");

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // add to cart

router.post("/", auth, function _callee3(req, res) {
  var user, newCart;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findById(req.user.id));

        case 3:
          user = _context3.sent;
          newCart = new Cart({
            user: user.id,
            movieId: req.body.id,
            movie: req.body,
            price: 2.99
          });
          _context3.next = 7;
          return regeneratorRuntime.awrap(newCart.save());

        case 7:
          res.json(newCart);
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);
          res.status(500).send("Server Error!");

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 10]]);
}); // Add to cart for TvShows

router.post("/tv_show", function _callee4(req, res) {
  var _req$body, id, name, poster_path, overview, first_air_date, price;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, id = _req$body.id, name = _req$body.name, poster_path = _req$body.poster_path, overview = _req$body.overview, first_air_date = _req$body.first_air_date;
          price = 2.99;
          newItem.save().then(function (product) {
            return res.json(product);
          });

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
}); // Delete movie in cart

router["delete"]("/:id", auth, function _callee5(req, res) {
  var cart;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log(req.body);
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Cart.findOneAndDelete({
            movieId: req.params.id
          }));

        case 4:
          cart = _context5.sent;
          res.json(cart);
          _context5.next = 13;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);

          if (!(_context5.t0.kind === "ObjectId")) {
            _context5.next = 12;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            msg: "Item not found"
          }));

        case 12:
          res.status(500).send("Server Error");

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
});
module.exports = router;