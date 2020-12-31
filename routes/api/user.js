const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
require("dotenv").config();
var secured = require("../../middleware/secured");
const { checkJwt } = require("../../middleware/check-jwt");

const User = require("../../models/User");
const Auth0_User = require("../../models/Auth0.User");




router.get('/auth0', async (req, res) => {

  try {

    console.log("GET auth0==> " + req.user)
    const user = await Auth0_User.findById(req.user.id).select("-email");
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

})



// get user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// register user
router.post(
  "/",
  [
    check("email", "Please enter a valid email!").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters!"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {

    const errors = validationResult(req);


    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });

      if (user) {
        res.status(400).json({
          errors: [
            {
              msg: "User already exits!",
            },
          ],
        });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
