const mongoose = require("mongoose");

//WEIGHT SCHEMA
const WeightSchema = new mongoose.Schema({
    catId: { 
      type: mongoose.Types.ObjectId, 
      ref: 'Cat' ,
    },
    catWeight: {
      type: Number,
      min: 0,
      max: 25,
    },
    date: Date,
});

module.exports = new mongoose.model("Weight", WeightSchema);