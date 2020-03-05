const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
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
  releaseDate: {
    type: Date,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Movie = mongoose.model("movie", MovieSchema);
