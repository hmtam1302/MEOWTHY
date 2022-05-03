const mongoose = require("mongoose");

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
  email: String,
  phone: String,
});

module.exports = new mongoose.model("User", UserSchema);