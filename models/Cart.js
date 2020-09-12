const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  movieId: {
    type: Number
  },
  movie: {
    type: Object
  },
  price: {
    type: Number
  }
});

module.exports = Cart = mongoose.model("cart", CartSchema);