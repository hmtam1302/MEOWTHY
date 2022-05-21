const express = require("express");
const router = express.Router();
const Diary = require("../models/Diary");
const Food = require("../models/Food");
const FedFood = require("../models/FetFood");
const Cat = require('../models/Cat');
const Weight = require('../models/Weight');
const Goal = require('../models/Goal');

require("dotenv").config();


router.get("/cat/:catId/diary", async (req, res) => {
  const { catId } = req.params;
  const response = await Cat.find({ catId });
  if (response.length === 0) {
    res.status(500).json({ message: "Wrong catId!" });
  } else {
    try {
      const dbDiary = new Diary({
        catId: catId,
        date: new Date(),
        food_calories: 0,
        water_amount: 0,
        exercise: "",
        about: "",
      });

      // Save diary to db
      await dbDiary.save();
      res.status(200).json({ message: "Create today diary successfully!" });

    } catch (err) { res.status(500).json({ message: JSON.stringify(err) }) };
  }
});


router.get('/cat/:catId/diary/:date', async (req, res) => {
  try {
    const { cat_id, diary_date } = req.params;
    const diary = await Diary.find({ cat_id, diary_date });
    const data = await Promise(async () => {
      const weight = await Weight.find({ catId: cat_id }).sort({ date: -1 });
      diary._doc.weight = weight;

      const goal = await Goal.find({ catId: cat_id }).sort({ date: -1 });
      diary._doc.goal = goal;
      return diary;
    });
    return res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
})


// router.get('/calendar', async (req, res) => {
//   try {
    
//     }));
//     return res.status(200).json({ data: data });
//   } catch (err) {
//     res.status(500).json({ message: JSON.stringify(err) });
//   }
// })


const calcCalories = async (amount, calories) => amount/100*calories;


router.get('/cat/:catId/diary/:date/food', async (req, res) => {
  try {
    const { cat_id, diary_date } = req.params;
    const diary = await Diary.find({ catId : cat_id, date : diary_date });
    const listFood = await FedFood.find({diaryId : diary._id})
    return res.status(200).json({ data: listFood });
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
})


router.post("/cat/:catId/diary/:date/food", async (req, res) => {
  const { catId, diary_date } = req.params
  const { foodname, amount } = req.body;
  const diary = await Diary.find({ catId: catId, date : diary_date });
  if (diary.length === 0) {
    res.status(500).json({ message: "Diary at the date of catId not found" });
  } else {
    try {
      const food = await Food.find({ name : foodname });
      let calories = await calcCalories(amount, food._doc.calories);
      const dbFedFood = new FedFood({
        diaryId: diary._id,
        name: foodname,
        amount: amount,
        calories: calories,
      });

      // Save fed food to db
      const responseFedFood = await dbFedFood.save();
      diary._doc.food_calories += calories;
    } catch (err) { res.status(500).json({ message: JSON.stringify(err) }) };
  }
})


router.get("/cat/:catId/diary/:date/food/:foodId", async (req, res) => {
  const response = await FedFood.find({ _id: req.params.foodId });
  if (response.length > 0)
    res.status(200).json({ data: response[0] });
  else res.status(500).json({ error: 'Not found selected food' })
})


router.put("/cat/:catId/diary/:date/food/:foodId", async (req, res) => {
  const { catId, diary_date, foodId } = req.params
  const { foodname, amount } = req.body;
  const diary = await Diary.find({ catId: catId, date : diary_date });
  if (diary.length === 0) {
    res.status(500).json({ message: "Diary at the date not found" });
  } else {
      const food = await Food.find({ name : foodname });
      const fed_food = await FedFood.find({ _id: foodId })
      let calories = await calcCalories(amount, food._doc.calories);
      diary._doc.food_calories += calories - fed_food.calories;
      FedFood.findOneAndUpdate({ _id : foodId }, {name : foodname, amount : amount, calories : calories})
      .then(() => {
        res.status(200).json({ message: "Update successful!" })
      })
      .catch((err) =>
        res
          .status(500)
          .json({ message: JSON.stringify(err) })
      );
  }
});


router.delete("/cat/:catId/diary/:date/food/:foodId", async (req, res) => {
  const { catId, diary_date, foodId } = req.params
  const diary = await Diary.find({ catId: catId, date : diary_date })
  const response = await FedFood.find({ diaryId: diary._id });
  if (response.length === 0) {
    res.status(500).json({ message: "Selected food not found" });
  } else {
    diary._doc.calories -= response._doc.calories;
    FedFood.findOneAndDelete({ _id : foodId })
    .then(() => {
      res.status(200).json({ message: "Delete successful!" })
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: JSON.stringify(err) })
    );
  }
});


router.put("/cat/:catId/diary/:date/change-water-amount", async (req, res) => {
  const { catId, diary_date } = req.params
  const { amount } = req.body;
  const diary = await Diary.find({ catId: catId, date : diary_date });
  if (diary.length === 0) {
    res.status(500).json({ message: "Diary at the date not found" });
  } else {
    const data = await Promise(async () => {
      diary._doc.water_amount += amount;
      return diary._doc.water_amount;
    });
    return res.status(200).json({ data: data });
  }
});


router.put("/cat/:catId/diary/:date/exercise", async (req, res) => {
  const { catId , diary_date } = req.params
  const { exercise } = req.body;
  const response = await Diary.find({ catId: catId , date: diary_date });
  //Check diary date
  if (response.length === 0) {
    res.status(500).json({ message: "Diary not found!" });
  } else {
    try {
        await Diary.findOneAndUpdate(
          { catId , diary_date },
          { exercise: exercise }
        );
        res.status(200).json({ message: "Save About success!" });
    } catch (err) {
      res.status(500).json({ message: JSON.stringify(err) });
    }
  }
});


router.put("/cat/:catId/diary/:date/about", async (req, res) => {
  const { catId , diary_date } = req.params
  const { about } = req.body;
  const response = await Diary.find({ catId: catId , date: diary_date });
  //Check diary date
  if (response.length === 0) {
    res.status(500).json({ message: "Diary not found!" });
  } else {
    try {
        await Diary.findOneAndUpdate(
          { catId , diary_date },
          { about: about }
        );
        res.status(200).json({ message: "Save About success!" });
    } catch (err) {
      res.status(500).json({ message: JSON.stringify(err) });
    }
  }
});



module.exports = router;