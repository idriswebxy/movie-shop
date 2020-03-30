const express = require("express");
const router = express.Router();
// const mongoose = require("mongoose");
// const passport = require("passport");
// const findOrCreate = require("mongoose-findorcreate");
// const passportLocalMongoose = require("passport-local-mongoose");
// const keys = require("../../config/keys");
// const { check, validationResult } = require("express-validator");
// Load Product Model

// Load Profile model


const Cart = require("../../models/Cart");



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
router.post("/", (req, res) => {
  
  const { id, title, poster_path, overview, release_date } = req.body;

  const price = 2.99;

  // Create new Product
  const newItem = new Cart({
    id: id,
    name: title,
    image: poster_path,
    description: overview,
    price: price,
    releaseDate: release_date
  });

  newItem.save().then(product => res.json(product));
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

  } 
  catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Item not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
