const express = require("express");
const router = express.Router();

const Cart = require("../../models/Cart");



router.post("/", async (req, res) => {

  const movieList = req.body;

  const shuffled = movieList.sort(() => 0.5 - Math.random());

  let selected = shuffled.slice(0, 5);

  res.json(selected)

});



router.get("/genre_id", async (req, res) => {

  try {

    let relatedId = await Cart.findOne({ name });

    

    res.json(relatedId)

  } catch (err) {
    return res.status(404).json({ msg: "Item id not found" });
  }

console.log(relatedId)

})

module.exports = router;
