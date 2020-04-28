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
  console.log("api ran....");

  try {
    await Cart.find({}, (err, id) => {
      id.map(movie => {
        if (movie.genreId.length > 0) {
          console.log(movie)
          res.json(movie.genreId[0])
        }
        else {
          res.json("NONE")
        }
      })

    });
  } catch (err) {
    return res.status(404).json({ msg: "Item id not found" });
  }
});

module.exports = router;
