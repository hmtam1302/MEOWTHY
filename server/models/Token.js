const mongoose = require("mongoose");

//GOAL SCHEMA
const TokenSchema = new mongoose.Schema({
    value: {
      type: String,
      length: 6,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    expireDate: Date
});

module.exports = new mongoose.model("Token", TokenSchema);