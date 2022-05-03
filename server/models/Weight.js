const mongoose = require("mongoose");

//WEIGHT SCHEMA
const WeightSchema = new mongoose.Schema({
    catid: { 
      type: mongoose.Types.ObjectId, 
      ref: 'Cat' ,
    },
    catweight: {
      type: mongoose.Types.Decimal128,
      min: 0,
      max: 25,
    },
    date: Date,
});

module.exports = new mongoose.model("Weight", WeightSchema);