const express = require("express");
const router = express.Router();
var validator = require("validator");

const Movie = require("../../models/Movie");



// Set movies from api
router.post("/", async (req, res) => {

  // const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  try {
    let movie = await Movie();

    let movieObj = {
      id: movie.id,
      name: movie.title,
      description: movie.overview,
      image: movie.poster_path,
      releaseDate: movie.release_date
    };

    for (let i = 0; i < req.body.length; i++) {
      movie.movies[i] = req.body[i];
      
    }


    
    await movie.save();

    res.json(movie.movies);

  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
