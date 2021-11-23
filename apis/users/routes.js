const express = require("express");
const passport = require("passport");
const { signup, signin } = require("./controllers");

// Create a mini express application
const router = express.Router();

//signup
router.post("/signup", signup);

//signin
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
