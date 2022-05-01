const mongoose = require("mongoose");

//TYPE FOR ALL TEXT INPUT
const texttype = {
  type: String,
  maxlength: 160,
};
//USER SCHEMA
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cats: [{
    type: mongoose.Types.ObjectId,
    ref: 'Cat',
  }],
});
//WEIGHT SCHEMA
const WeightSchema = new mongoose.Schema({
  catweight: {
    type: mongoose.Types.Decimal128,
    min: 0,
    max: 25,
  },
  date: Date,
});
//FOOD SCHEMA
const FoodSchema = new mongoose.Schema({
  name: String,
  amount: {
    type: Number,
    min: 0
  },
  calories: {
    type: Number,
    min: 0
  }
});
//DIARY SCHEMA
const DiarySchema = new mongoose.Schema({
  date: Date,
  food: FoodSchema,
  water_amount: Number,
  exercise: texttype,
  about: texttype,
});
//CAT SCHEMA
const CatSchema = new mongoose.Schema({
  catname: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  age:{
    type: Number,
    min: 0,
    max: 40,
  },
  sex:{
    type: String,
    enum: ['Đực','Cái','Khác'],
    default: 'Khác'
  },
  breed: {
    type: String,
    enum: ['Mèo ta','Mèo Xiêm','Mèo Anh lông dài','Mèo Anh lông ngắn','Mèo Ba Tư','Mèo tai cụp','Mèo chân ngắn Munchkin','Mèo Ai Cập','Khác'],
    default: 'Mèo ta',
  },
  bio: texttype,
  weight: [{
    type: mongoose.Types.ObjectId,
    ref: 'Weight',
  }],
  goal: [{
    type: mongoose.Types.ObjectId,
    ref: 'Goal',
  }],
  diary: [{
    type: mongoose.Types.ObjectId,
    ref: 'Diary',
  }],
});

module.exports = new mongoose.model("User", UserSchema);
module.exports = new mongoose.model("Weight", WeightSchema);
module.exports = new mongoose.model("Goal", WeightSchema);
module.exports = new mongoose.model("Diary", DiarySchema);
module.exports = new mongoose.model("Cat", CatSchema);