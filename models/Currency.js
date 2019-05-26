const mongoose = require("mongoose");

const currencySchema = mongoose.Schema({
  NOK: Number,
  PLN: Number,
  GBP: Number,
  USD: Number
});

module.exports = mongoose.model("Currency", currencySchema);
