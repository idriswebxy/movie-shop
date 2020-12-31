const express = require("express");
const router = express.Router();
var passport = require("passport");
const jwtExpress = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const { checkJwt } = require("../../middleware/check-jwt");

const Auth0_User = require("../../models/Auth0.User");



// Login
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);



// create auth0 user
router.post("/auth0", checkJwt, async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email } = req.body;

    let user = await Auth0_User.findOne({
      email,
    });

    console.log("Found in DB ==> " + user);

    if (user) {
      console.log('User already exists!')
      res.status(400).json({
        errors: [
          {
            msg: "User already exits!",
          },
        ],
      });
    } 
    else {

      auth0_user = new Auth0_User({
        name,
        email,
      });
      await auth0_user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
          });
        }
      );
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
