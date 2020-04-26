const express = require("express");
const router = express.Router();

const Cart = require("../../models/Cart");


router.post("/", async (req, res) => {
  let movieList = req.body;

  let shuffled = movieList.sort(() => 0.5 - Math.random());

  let selected = shuffled.slice(0, 6);

  res.json(selected);
});



router.get("/genre_id", async (req, res) => {
  try {
    let relatedId = await Cart.findOne({ genreId });

    // res.json(relatedId);

    console.log(relatedId)
    console.log("Heyy")

  } catch (err) {
    return res.status(404).json({ msg: "Item id not found" });
  }

});

module.exports = router;
