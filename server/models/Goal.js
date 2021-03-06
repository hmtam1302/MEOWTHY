const mongoose = require("mongoose");

//GOAL SCHEMA
const GoalSchema = new mongoose.Schema({
    catId: { 
      type: mongoose.Types.ObjectId, 
      ref: 'Cat' ,
    },
    catGoal: {
      type: Number,
      min: 0,
      max: 25,
    },
    date: Date,
});

module.exports = new mongoose.model("Goal", GoalSchema);