const mongoose = require("mongoose");

//FOOD SCHEMA
const FoodSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    calories: Number,
  });

module.exports = new mongoose.model("Food", FoodSchema);