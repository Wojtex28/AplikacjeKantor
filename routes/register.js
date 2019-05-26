const express = require('express');
const router = express.Router();
const User = require("../models/User");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");



router.get("/", (req, res) => {
        res.render("register");
    })
    .post("/", (req, res) => {
        User.register({
            username: req.body.username
        }, req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                res.redirect("/register");

            } else {
                passport.authenticate("local")(req, res, () => {
                    res.redirect("/kantor");
                });

            }
        });
    });

module.exports = router;