const express = require("express");
const router = express.Router();

const Cart = require("../../models/Cart");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const Auth0_User = require("../../models/Auth0.User");

// returns total price in cart
router.get("/total/:id", auth, async (req, res) => {
  try {
    let sum = 0.0;

    const usersCart = await Cart.find({ user: req.params.id });

    usersCart.map((movie) => {
      sum = movie.price + sum;
    });
    res.json(sum);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error...");
  }
});


// Get users cart
router.get("/", auth, async (req, res) => {
  try {
    const items = await Cart.find({ user: req.user.id });

    res.json(items.map((item) => item.movie).reverse());

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});




// add to cart
router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const newCart = new Cart({
      user: user.id,
      movieId: req.body.id,
      movie: req.body,
      price: 2.99,
    });
    await newCart.save();
    res.json(newCart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

// Add to cart for TvShows
// router.post("/tv_show", async (req, res) => {

//   try {
//     const user = await User.findById(req.user.id);

//     const newCart = new Cart({
//       user: user.id,
//       movieId: req.body.id,
//       movie: req.body,
//       price: 2.99
//     });

//     await newCart.save();

//     res.json(newCart);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error!");
//   }
// });

// Delete movie in cart
router.delete("/:id", auth, async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ movieId: req.params.id });

    res.json(cart);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
