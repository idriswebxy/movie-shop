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

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'Z1GHe0STO0EOcJ6Bsaj590A9rhCbuOpx',
  issuerBaseURL: 'https://twilight-bonus-1388.us.auth0.com',
  secret: 'some long string'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// Middleware to make the `user` object available for all views
// app.use(function (req, res, next) {
//   res.locals.user = req.oidc.user;
//   next();
// });

// app.get('/test0', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')

// });


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
