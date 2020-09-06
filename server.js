const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
var passport = require("passport");
const cors = require("cors");

// Routes
const user = require("./routes/api/user");
const cart = require("./routes/api/cart");
const auth = require("./routes/api/auth");
const movie = require("./routes/api/movie");

const app = express();

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
app.use("/api/movie", movie);
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

app.listen(port, () => console.log(`Server running on port ${port}... 🚀`));