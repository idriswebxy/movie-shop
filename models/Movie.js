const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  price: {
    type: Number
  },
  releaseDate: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Movie = mongoose.model("movie", MovieSchema);
