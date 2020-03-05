const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  nickName: {
    type: String
  },
  avatar: {
    type: String
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
