const mongoose = require("mongoose");

//GOAL SCHEMA
const GoalSchema = new mongoose.Schema({
    catid: { 
      type: mongoose.Types.ObjectId, 
      ref: 'Cat' ,
    },
    catgoal: {
      type: mongoose.Types.Decimal128,
      min: 0,
      max: 25,
    },
    date: Date,
});

module.exports = new mongoose.model("Goal", GoalSchema);