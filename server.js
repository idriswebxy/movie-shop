const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
var passport = require("passport");
const cors = require("cors");
var session = require("express-session");
var Auth0Strategy = require("passport-auth0");
var dotenv = require("dotenv");

// Routes
const user = require("./routes/api/user");
const cart = require("./routes/api/cart");
const auth = require("./routes/api/auth");

const app = express();



var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.AUTH0_CALLBACK_URL || "http://localhost:3000/movies",
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);


passport.use(strategy);


// config express-session
var sess = {
  secret: "rasberry",
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

// if (app.get("env") === "production") {
//   // Use secure cookies in production (requires SSL/TLS)
//   sess.cookie.secure = true;

//   // Uncomment the line below if your application is behind a proxy (like on Heroku)
//   // or if you're encountering the error message:
//   // "Unable to verify authorization request state"
//   // app.set('trust proxy', 1);
// }

app.use(session(sess));


app.use(function (req, res, next) {
  if (req && req.query && req.query.error) {
    req.flash("error", req.query.error);
  }
  if (req && req.query && req.query.error_description) {
    req.flash("error_description", req.query.error_description);
  }
  next();
});


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("Database connected...✅"))
  .catch((err) => console.error(err));

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
// app.use("/api/movie", movie);
app.use("/api/user", user);
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

app.listen(port, () => console.log(`Server running on port ${port}...🚀`));
