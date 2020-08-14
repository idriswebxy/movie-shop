const express = require("express");
const router = express.Router();

const Cart = require("../../models/Cart");
const Profile = require("../../models/Profile")

// returns total price in cart
router.post("/total", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const items = await Cart.find().sort({ date: -1 });
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// Add to cart
router.post("/", async (req, res) => {
  try {
    const {
      id,
      title,
      poster_path,
      overview,
      release_date,
      genre_ids,
    } = req.body;

    const price = 2.99;

    // Create new Product
    const newItem = new Cart({
      id: id,
      name: title,
      image: poster_path,
      description: overview,
      price: price,
      genreId: genre_ids,
      releaseDate: release_date,
    });

    await Profile.findOneAndUpdate({
      
    })

    newItem.save().then((product) => res.json(product));
  } catch (error) {
    res.status(500).json()
  }
});



// Add to cart for TvShows
router.post("/tv_show", async (req, res) => {
  const { id, name, poster_path, overview, first_air_date } = req.body;

  const price = 2.99;

  // Create new Product
  const newItem = new Cart({
    id: id,
    name: name,
    image: poster_path,
    description: overview,
    price: price,
    releaseDate: first_air_date,
  });

  newItem.save().then((product) => res.json(product));
});

// Delete item
router.delete("/:id", async (req, res) => {


  try {
    const item = await Cart.findById(req.params.id);

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
