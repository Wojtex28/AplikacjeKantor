const express = require("express");
const router = express.Router();
const User = require("../models/User");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

router
  .get("/", (req, res) => {
    res.render("login");
  })


  .post("/", (req, res, next) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    });

    passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.redirect("/kantor");
        });
      })
      (req, res, next);
  });



module.exports = router;