const express = require("express");
const router = express.Router();

const Cart = require("../../models/Cart");
const User = require("../../models/User")
const auth = require("../../middleware/auth");




// returns total price in cart
router.post("/total/:id", auth, async (req, res) => {
  try {
    let array = req.body;

    let sum = 0.0;

    for (let i = 0; i < array.length; i++) {
      sum = array[i].price + sum;
    }

    res.json(sum);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error...");
  }
});



// Get all items
router.get("/:id", async (req, res) => { 

  try {
    const items = await Cart.find({ userId: req.params.id }).sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



// Create a cart
router.post("/:id", async (req, res) => {

  
  try {
    console.log(req.user.id)

    // const user = await Cart.find({ userId: req.params.id });

    // Create new Product
    const newCart = new Cart({
      user: req.params.id,
      cartItem: req.body
    });

    
    const userCart = await newCart.save();

    res.json(userCart)
    

  } 
  catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error!");
  }
});



router.put("/:id", async (req, res) => {

  try {
    
    const user = await Cart.findOne({ userId: req.params.id });





    res.send(user)




  } catch (err) {
    
  }



})




// Add to cart for TvShows
router.post("/tv_show", async (req, res) => {

  const { id, name, poster_path, overview, first_air_date } = req.body;

  const price = 2.99;

  // Create new Product
  

  newItem.save().then((product) => res.json(product));
});




// Delete item
router.delete("/:id/:movieId", auth, async (req, res) => {

  try {
    const usersItem = await Cart.find({ user: req.params.id });

    usersItem.filter(movie => movie.cartItems === req.params.movieId)

    console.log(usersItem)

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    await item.remove();

    res.json({ msg: "Item removed" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
