const express = require("express");
const router = express.Router();
const Diary = require("../models/Diary");
const Food = require("../models/Food");
const FedFood = require("../models/FetFood");
const Cat = require('../models/Cat');
const Weight = require('../models/Weight');
const Goal = require('../models/Goal');

require("dotenv").config();


//Swagger Diary schema
/**
 * @swagger
 * components:
 *  schemas:
 *    Diary:
 *      type: object
 *      required:
 *        - catID
 *        - date
 *      properties:
 *        catId:
 *          type: string
 *          description: Id of the chosen cat
 *        date:
 *          type: Date
 *          description: Date of diary record
 *        food_calories: 
 *          type: number
 *          description: Calories record
 *        water_amount:  
 *          type: number
 *          description: Water record
 *        exercise: 
 *          type: string
 *          description: Exercise record
 *        about:
 *          type: string
 *          description: About the chosen cat record
 *        weight:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CatWeight' 
 *        goal:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CatGoal' 
 *      example:
 *        catId: catId,
 *        date: "2022-04-01",
 *        food_calories: 250,
 *        water_amount: 200,
 *        exercise: "",
 *        about: "",
 *        weight: [{
 *            _id: weight123456,         
 *            catId: abc123456789,
 *            catWeight: 1,    
 *            date: "2022-05-16T16:55:13.254Z",
 *        }],
 *        goal: [{
 *            _id: goal123456,        
 *            catId: abc123456789,
 *            catGoal: 1,    
 *            date: "2022-05-16T16:55:13.254Z",  
 *        }]
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    DiaryFood:
 *      type: object
 *      required:
 *        - diaryID
 *        - name
 *        - amount
 *        - calories
 *      properties:
 *        diaryId:
 *          type: string
 *          description: Diary Id
 *        name:
 *          type: string
 *          description: Food name
 *        amount:  
 *          type: number
 *          description: Food amount
 *        calories: 
 *          type: number
 *          description: Food calories
 *      example:
 *        diaryId: diary123456789
 *        name: "Cơm"
 *        amount: 100
 *        calories: 130
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    DiaryChangeWaterAmount:
 *      type: object
 *      required:
 *        - amount
 *      properties:
 *        amount:  
 *          type: number
 *          description: Water amount
 *      example:
 *        amount: 100
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    DiaryExercise:
 *      type: object
 *      required:
 *        - exercise
 *      properties:
 *        exercise:  
 *          type: string
 *          description: About the chosen cat record
 *      example:
 *        exercise: "Walk for 30 minutes"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    DiaryAbout:
 *      type: object
 *      required:
 *        - about
 *      properties:
 *        about:  
 *          type: string
 *          description: Exercise record
 *      example:
 *        about: "Today A is a good girl"
 */
//------------------------------------------------------


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


/**
 * @swagger
 * /cat/{catId}/diary/{date}:
 *  get:
 *    summary: Get diary record at date
 *    tags: [Diary]
 *    parameters:
 *      - in: path
 *        name: catId, date
 *        schema:
 *          type: string
 *        required: true
 *        description: Identify diary
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/Diary'
 *      '500':
 *        description: Error response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *
 */

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


const calcCalories = async (amount, calories) => amount/100*calories;


/**
 * @swagger
 * /cat/{catId}/diary/{date}/food:
 *  get:
 *    summary: Get list cat of user id
 *    tags: [DiaryFood]
 *    parameters:
 *      - in: path
 *        name: catId, date
 *        schema:
 *          type: string
 *        required: true
 *        description: Identify Diary
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/DiaryFood'
 *      '500':
 *        description: Error response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *
 */

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


/**
 * @swagger
 * /cat/:catId/diary/:date/food:
 *  post:
 *    summary: Add food to diary record
 *    tags: [DiaryFood]
 *    parameters:
 *      - in: path
 *        name: catId, date
 *        schema:
 *          type: string
 *        required: true
 *        description: Identify Diary
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/DiaryFood'
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *      '500':
 *        description: Error response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *
 */

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
      await dbFedFood.save();
      diary._doc.food_calories += calories;
    } catch (err) { res.status(500).json({ message: JSON.stringify(err) }) };
  }
})


/**
 * @swagger
 * /cat/{catId}/diary/{date}/food/{foodId}:
 *  get:
 *    summary: Get food record
 *    tags: [DiaryFood]
 *    parameters:
 *      - in: path
 *        name: foodId
 *        schema:
 *          type: string
 *        required: true
 *        description: Fed food Id
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/DiaryFood'
 *      '500':
 *        description: Error response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 * 
 *  put:
 *    summary: Change food in record
 *    tags: [DiaryFood]
 *    parameters:
 *      - in: path
 *        name: foodId
 *        schema:
 *          type: string
 *        required: true
 *        description: food Id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/DiaryFood'
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *      '500':
 *        description: Error response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 * 
 *  delete:
 *    summary: Delete a food in record
 *    tags: [DiaryFood]
 *    parameters:
 *      - in: path
 *        name: foodId
 *        schema:
 *          type: string
 *        required: true
 *        description: food Id
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *      '500':
 *        description: Error response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *
 */

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


/**
 * @swagger
 * /cat/{catId}/diary/{date}/change-water-amount:
 *  put:
 *    summary: Change water amount
 *    tags: [DiaryChangeWaterAmount]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/DiaryChangeWaterAmount'
 *    responses:
 *      '200':
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *      '500':
 *        description: Error response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *
 */

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


/**
 * @swagger
 * /cat/{catId}/diary/{date}/exercise:
 *  put:
 *    summary: Update exercise
 *    tags: [DiaryExercise]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/DiaryExercise'
 *    responses:
 *      '200':
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *      '500':
 *        description: Error response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *
 */

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


/**
 * @swagger
 * /cat/{catId}/diary/{date}/about:
 *  put:
 *    summary: Update about
 *    tags: [DiaryAbout]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/DiaryAbout'
 *    responses:
 *      '200':
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Success message
 *      '500':
 *        description: Error response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *
 */

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