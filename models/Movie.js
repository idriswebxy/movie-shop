const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  movieList: {
    type: Array,
  },
  currentMovie: {
    type: Object,
  },
});

module.exports = Movie = mongoose.model("movie", MovieSchema);
