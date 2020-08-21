const jwt = require("jsonwebtoken");
const config = require("config");
require("dotenv").config();



module.exports = function(req, res, next) {
  //  Get token from header
  const token = req.header("x-auth-token");
  
  // check if no token
  if (!token) {
    console.log("No token...")
    return res.status(401).json({ msg: "No token, authorization denied!" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid..." });
  }
};
