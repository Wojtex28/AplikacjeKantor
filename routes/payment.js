const express = require("express");
const User = require("../models/User");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

const router = express.Router();


router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("payment");
  } else {
    res.redirect("/login");
  }

}).post("/", (req, res) => {
  const currency = req.body.curr;
  const paidCurr = parseInt(req.body.payment, 10);
  const userId = req.user._id;

  User.findById(userId, (err, foundUser) => {
    if (err) {
      console.log(err);

    } else {
      let dodac = parseInt(foundUser.currencies[currency], 10);
      let dodane = dodac + paidCurr;


      foundUser.currencies[currency] = dodane;

      foundUser.save(() => {
        res.redirect("/kantor");
      });
    }
  });
});


module.exports = router;