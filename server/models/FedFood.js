const mongoose = require("mongoose");

//FED FOOD SCHEMA
const FedFoodSchema = new mongoose.Schema({
    diaryId: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Diary' ,
      },
    name: String,
    amount: Number,
    calories: Number,
  });

module.exports = new mongoose.model("FedFood", FedFoodSchema);