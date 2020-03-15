const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: false
  },
  password: {
    type: String,
    required: true
  },
  items: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);


module.exports = User = mongoose.model("user", UserSchema);
