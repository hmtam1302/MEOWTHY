const mongoose = require("mongoose");

//CAT SCHEMA
const CatSchema = new mongoose.Schema({
    userid: { 
      type: mongoose.Types.ObjectId, 
      ref: 'User' ,
    },
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
      default: 'Khác',
    },
    breed: {
      type: String,
      enum: ['Mèo ta','Mèo Xiêm','Mèo Anh lông dài','Mèo Anh lông ngắn','Mèo Ba Tư','Mèo tai cụp','Mèo chân ngắn Munchkin','Mèo Ai Cập','Khác'],
      default: 'Mèo ta',
    },
    bio: {
      type: String,
      maxlength: 160,
    },
    defaultcat: Boolean,
  });

module.exports = new mongoose.model("Cat", CatSchema);