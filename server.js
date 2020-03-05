const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
var session = require("express-session");
var passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/User");
// const googleStrategy = require("./config/config");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");

// Routes
const users = require("./routes/api/users");
const cart = require("./routes/api/cart");
const auth = require("./routes/api/auth");

const app = express();

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(console.log("Database connected...✅"))
  .catch(err => console.error(err));

// app.use(
//   session({
//     secret: "secret key",
//     resave: false,
//     saveUninitialized: false
//   })
// );

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/products",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//     },
//     function(accessToken, refreshToken, profile, cb) {

//       User.findOrCreate({ googleId: profile.id }, function(err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
app.use("/api/users", users);
app.use("/api/cart", cart);
app.use("/api/auth", auth);

//Serve static assets if in productions
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}... 🚀`));
