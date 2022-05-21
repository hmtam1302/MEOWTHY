const express = require("express");
const router = express.Router();
const Weight = require('../models/Weight');
const Goal = require('../models/Goal');

require("dotenv").config();


router.post("/cat/:catId/set-goal", async (req, res) => {
  const { catId } = req.params;
  const { goal } = req.body;
  if (response.length === 0) {
    res.status(500).json({ message: "Wrong catId!" });
  } else {
    try {
      const dbGoal = new Goal({
        catId: catId,
        catGoal: goal,
        date: new Date(),
      });

      await dbGoal.save();
      res.status(200).json({ message: "Set goal successfully!" });

    } catch (err) { res.status(500).json({ message: JSON.stringify(err) }) };
  }
});


router.post("/cat/:catId/set-weight", async (req, res) => {
    const { catId } = req.params;
    const { weight } = req.body;
    if (response.length === 0) {
      res.status(500).json({ message: "Wrong catId!" });
    } else {
      try {
        const dbWeight = new Weight({
          catId: catId,
          catWeight: weight,
          date: new Date(),
        });
  
        await dbWeight.save();
        res.status(200).json({ message: "Set weight successfully!" });
  
      } catch (err) { res.status(500).json({ message: JSON.stringify(err) }) };
    }
  });


module.exports = router;