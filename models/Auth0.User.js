const mongoose = require("mongoose");

const Auth0_UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: false
  },
  items: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Auth0_User = mongoose.model("auth0_user", Auth0_UserSchema);
