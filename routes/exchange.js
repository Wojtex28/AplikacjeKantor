const express = require("express");
const request = require("request");

const router = express.Router();
const User = require("../models/User");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");


router.get("/", (req, res) => {
        if (req.isAuthenticated()) {
            res.render("exchange", {});
        } else {
            res.redirect("/login");
        }
    })
    .post("/", (req, res) => {
        const from = req.body.from;
        const to = req.body.to;
        const quanity = req.body.quanity;

        const userId = req.user._id;
        request(
            "https://api.ratesapi.io/api/latest?base=" + from + "&symbols=" + to,
            (error, response, body) => {
                const data = JSON.parse(body);
                const rate = data.rates[to];
                User.findById(userId, (err, foundUser) => {
                    if (err) {
                        console.log(err);

                    } else {
                        if (foundUser.currencies[from] < quanity) {

                            res.redirect("/kantor");

                        } else { ///////////////////dodawanie do konta
                            let afterChange = Math.round(quanity * rate);
                            let dodac = foundUser.currencies[to] + afterChange;

                            foundUser.currencies[to] = dodac;


                            ////////////////////////////////////////odejmowanie
                            let odjac = foundUser.currencies[from] - quanity;
                            foundUser.currencies[from] = odjac;

                            foundUser.save(() => {
                                res.redirect("/kantor");
                            });
                        }
                    }
                });
            }
        );


    });




module.exports = router;