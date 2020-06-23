const express = require("express");
const router = express.Router();

const Cart = require("../../models/Cart");




// return related movies
router.get("/genre_id", async (req, res) => {
  try {
    await Cart.find({}, (err, movie) => {
      let relatedIds = [];
      if (err) {
        res.json(err);
      }
      if (movie.length === 0) {
        return;
      } else {
        movie.map((id) => {
          relatedIds.push(id.genreId);
        });
      }

      let items = relatedIds[Math.floor(Math.random() * relatedIds.length)];

      let relatedMovies = items[Math.floor(Math.random() * items.length)];

      res.json(relatedMovies);
    });
  } catch (err) {
    return res.status(404).json({ msg: "Item id not found" });
  }
});

module.exports = router;
