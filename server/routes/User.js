const express = require("express");
const router = express.Router();
const User = require("../models/User");
//Encrypt password
const bcrypt = require("bcrypt");

//USER SECTION
//POST: CREATE A NEW USER
router.post("/signup", async (req, res) => {
  //QUERY USERNAME
  let response = await User.find({ username: req.body.username });
  if (response.length > 0) {
    res.json({ message: "Username has been registered!" });
  } else {
    let user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
    });

    user
      .save()
      .then(() => res.status(200).json({ message: "Signup success!" }))
      .catch((err) =>
        res
          .status(500)
          .json({ message: `User was not stored in database\n${err}` })
      );
  }
});

module.exports = router;