const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  cartItem: {
    type: Object
  },
});

module.exports = Cart = mongoose.model("cart", CartSchema);
