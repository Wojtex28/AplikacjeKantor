const express = require("express");
const mongoose = require("mongoose");
const Currency = require("../models/Currency");
const router = express.Router();
const User = require("../models/User");
 
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");
 
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    Currency.findOne({}, (err, found) => {
 
      if (!err) {
       
        res.render("kantor", {
 
          userEur: req.user.currencies.EUR,
          userUsd: req.user.currencies.USD,
          userPln: req.user.currencies.PLN,
          userNok: req.user.currencies.NOK,
          userGbp: req.user.currencies.GBP,
 
          Usd: found.USD,
          Nok: found.NOK,
          Gbp: found.GBP,
          Pln: found.PLN
 
 
 
        });
 
      }
 
    });
 
  } else {
    res.redirect("/login");
  }
});
module.exports = router;