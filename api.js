const express = require("express");
const mongoose = require("mongoose");
const request = require("request");
const Currency = require("./models/Currency");

const exApi = () => {
  request(
    "https://api.ratesapi.io/api/latest?symbols=USD,GBP,PLN,NOK",
    (error, response, body) => {
      const data = JSON.parse(body);

      const currency = new Currency({
        NOK: data.rates.NOK,
        PLN: data.rates.PLN,
        GBP: data.rates.GBP,
        USD: data.rates.USD
      });

      currency.save();
    }
  );
};

module.exports = exApi;