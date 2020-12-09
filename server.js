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
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const { auth } = require('express-openid-connect');

// Routes
const user = require("./routes/api/user");
const cart = require("./routes/api/cart");
const auth1 = require("./routes/api/auth");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(console.log("Database connected...✅"))
  .catch((err) => console.error(err));

// Configure Passport to use Auth0
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

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: "6MQst1aSZZxAgMIviU6f9qy33WikJCoV",
  issuerBaseURL: "https://dev-lhxohglr.auth0.com",
  secret: "soupandotherstuff",
};

passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const app = express();

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
app.use("/api/user", user);
app.use("/api/cart", cart);
app.use("/api/auth", auth1);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

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
