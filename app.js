const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const passport = require("passport");
const request = require("request");
const Currency = require("./models/Currency");
const User = require("./models/User");
require("dotenv/config");
const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const bodyParser = require("body-parser");

///////////////////////////Wymagane przez moduły - z dokumentacji na NPM////////////////////

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//////////////////////////// Łączenie z BD///////////////////////////////

mongoose.connect(
  process.env.DB_CONNECTION, {
    useNewUrlParser: true
  },
  () => console.log("connected to DB!")
);

/////////////////////////Startegia lgoowania/Sesje////////////////////////////////////////////////////


mongoose.set("useCreateIndex", true);

passport.use(User.createStrategy());




passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});



/////////////////////czyszczenie kolekcji kursów walut (odświeżanie kursów)//////////////////////////////

Currency.deleteMany({}, () => {
  console.log("Currencies refreshed");
});

//////////////////////importowanie  API//////////////////////////////////////////////////////////
const exApi = require("./api");
exApi();

/////////////////////////Importowanie routów /////////////////////////////////////

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const kantorRoute = require("./routes/kantor");
const logoutRoute = require("./routes/logout");
const paymentRoute = require("./routes/payment");
const exchangeRoute = require("./routes/exchange");

/////////////////////ROUTY///////////////////////////////

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/kantor", kantorRoute);
app.use("/logout", logoutRoute);
app.use("/payment", paymentRoute);
app.use("/exchange", exchangeRoute);

////////////////////server na heroku lub lokalnie///////////////////////////////

let port = process.env.PORT;
if (port == null || port == "") {
  port = 4000;
}
app.listen(port);