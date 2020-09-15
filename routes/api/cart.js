const express = require("express");
const router = express.Router();

const Cart = require("../../models/Cart");
const User = require("../../models/User");
const auth = require("../../middleware/auth");


// returns total price in cart
router.get("/total/:id", auth, async (req, res) => {
  
  try {
    
    let sum = 0.00;

    const cartTotal = await Cart.find({ user: req.params.id });
  
    cartTotal.map(m => { 
      sum = m.price + sum
    })

    res.json(sum)

    console.log(sum)



    // let array = req.body;

    // let sum = 0.0;

    // for (let i = 0; i < array.length; i++) {
    //   sum = array[i].price + sum;
    // }

    // res.json(sum);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error...");
  }
});



// Get users cart
router.get("/", auth, async (req, res) => {
  try {
    const items = await Cart.find({ user: req.user.id });
    res.json(items.map((item) => item.movie));
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
      price: req.body.price
    });

    await newCart.save();

    res.json(newCart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});



// Add to cart for TvShows
router.post("/tv_show", async (req, res) => {
  const { id, name, poster_path, overview, first_air_date } = req.body;

  const price = 2.99;

  newItem.save().then((product) => res.json(product));
});




// Delete movie in cart
router.delete("/:id", auth, async (req, res) => {  

  try {
    const cart = await Cart.findOneAndDelete({ movieId: req.params.id });

    res.json(cart)


    // res.json({ msg: "Item removed" });

  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
