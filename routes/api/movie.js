const express = require("express");
const router = express.Router();

const Cart = require("../../models/Cart");


// return 5 related movies
router.post("/", async (req, res) => {
  let movieList = req.body;

  let shuffled = movieList.sort(() => 0.5 - Math.random());

  let selected = shuffled.slice(0, 7);

  res.json(selected);
});



// return related id
router.get("/genre_id", async (req, res) => {   

  try {

    await Cart.find({}, (err, movie) => {
      
      let relatedIds = []

      movie.map(id => {
        if (id.genreId === " ") {
          res.json(null)
        }
        relatedIds.push(id.genreId)
      })
      var items = relatedIds[Math.floor(Math.random() * relatedIds.length)];
      var id = items[Math.floor(Math.random() * items.length)];
      res.json(id)
    })



  } catch (err) {
    return res.status(404).json({ msg: "Item id not found" });
  }
});

module.exports = router;
