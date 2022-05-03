const mongoose = require("mongoose");

//DIARY SCHEMA
const DiarySchema = new mongoose.Schema({
  catId: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Cat' ,
  },
  date: Date,
  food: String,
  water_amount: Number,
  exercise: {
    type: String,
    maxlength: 160,
  },
  about: {
    type: String,
    maxlength: 160,
  },
});

module.exports = new mongoose.model("Diary", DiarySchema);