const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    currencies: {
        EUR: {
            type: Number,
            default: 0
        },
        USD: {
            type: Number,
            default: 0
        },
        PLN: {
            type: Number,
            default: 0
        },
        NOK: {
            type: Number,
            default: 0
        },
        GBP: {
            type: Number,
            default: 0
        }

    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);