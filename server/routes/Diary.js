const express = require("express");
const router = express.Router();
const Diary = require("../models/Diary");
const FedFood = require("../models/FedFood");
const Cat = require("../models/Cat");
const Weight = require("../models/Weight");
const Goal = require("../models/Goal");

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
 *        _id:
 *          type: string
 *          description: CatWeight Id
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
 *        {
 *          _id: diary123456789,
 *          catId: catId,
 *          date: "2022-05-16T16:55:13.254Z",
 *          food_calories: 250,
 *          water_amount: 200,
 *          exercise: "",
 *          about: "",
 *          weight: [{
 *              _id: weight123456,
 *              catId: abc123456789,
 *              catWeight: 1,
 *              date: "2022-05-16T16:55:13.254Z",
 *          }],
 *          goal: [{
 *              _id: goal123456,
 *              catId: abc123456789,
 *              catGoal: 1,
 *              date: "2022-05-16T16:55:13.254Z",
 *          }]
 *        }
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ListDiary:
 *      type: array
 *      items:
 *         $ref: '#/components/schemas/Diary'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ListDiary:
 *      type: array
 *      items:
 *         $ref: '#/components/schemas/Diary'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    DiaryAdd:
 *      type: object
 *      properties:
 *        catId:
 *          type: string
 *          description: Cat Id
 *        date:
 *          type: Date
 *          description: the date diary opened
 *        food_calories:
 *          type: number
 *          description: Total calories of food the cat consumed at date
 *        water_amount:
 *          type: number
 *          description: Total amount of water the cat consumed at date
 *        exercise:
 *          type: string
 *          description: Written exercise record by user
 *        about:
 *          type: string
 *          description: Written diary record by user
 *      example:
 *        catId: cat12324
 *        date: "2022-05-16T16:55:13.254Z"
 *        food_calories: 0
 *        water_amount: 0
 *        exercise: ""
 *        about: ""
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    DiaryFood:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: Fed food Id
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
 *        {
 *          _id: ff123456789,
 *          diaryId: diary123456789,
 *          name: "C??m",
 *          amount: 100,
 *          calories: 130
 *        }
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ListFood:
 *      type: array
 *      items:
 *         $ref: '#/components/schemas/DiaryFood'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    FedFoodAdd:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Food name
 *        amount:
 *          type: number
 *          description: amount of fed food
 *        calories:
 *          type: number
 *          description: calories of fed food
 *      example:
 *        name: "C??m"
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
 *    DiaryExerciseUpdate:
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
 *    DiaryAboutUpdate:
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

/**
 * @swagger
 * /diary/list-diary/{catId}:
 *  get:
 *    summary: Get list diary of cat id
 *    tags: [Diary]
 *    parameters:
 *      - in: path
 *        name: catId
 *        schema:
 *          type: string
 *        required: true
 *        description: catId
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/ListDiary'
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
router.get("/list-diary/:catId", async (req, res) => {
  try {
    const { catId } = req.params;
    const listDiary = await Diary.find({ catId });
    let returnValue = listDiary._doc;
    if (listDiary) {
        const returnValue = await Promise.all(listDiary.map(async diary => {
            const listWeight = await Weight.find({ catId });
            diary._doc.weight = listWeight;
            const listGoal = await Goal.find({ catId });
            diary._doc.goal = listGoal;
            return diary;
        }));
        return res.status(200).json({ data: returnValue });
      } else {
        return res.status(500).json({ message: "Cannot found cat with given id" })
      }
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

/**
 * @swagger
 * /diary/add-diary/{catId}:
 *  post:
 *    summary: Add a new diary page of cat id
 *    tags: [Diary]
 *    parameters:
 *      - in: path
 *        name: catId
 *        schema:
 *          type: string
 *        required: true
 *        description: catId
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/DiaryAdd'
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

router.post("/add-diary/:catId", async (req, res) => {
  const { catId } = req.params;
  const response = await Cat.find({ catId });
  const day = new Date();
  const today =
    day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
  if (response.length === 0) {
    res.status(500).json({ message: "Wrong catId!" });
  } else {
    try {
      const dbDiary = new Diary({
        catId: catId,
        // date: new Date(),
        date: today,
        food_calories: 0,
        water_amount: 0,
        exercise: "L??n k??? ho???ch t???p luy???n cho b?? n??o!",
        about: "H??m nay b?? th??? n??o?",
      });

      // Save diary to db
      await dbDiary.save();
      res.status(200).json({ message: "Create today diary successfully!" });
    } catch (err) {
      res.status(500).json({ message: JSON.stringify(err) });
    }
  }
});

/**
 * @swagger
 * /diary/{diaryId}:
 *  get:
 *    summary: Get a diary page
 *    tags: [Diary]
 *    parameters:
 *      - in: path
 *        name: diaryId
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

router.get("/:diaryId", async (req, res) => {
  try {
    const { diaryId } = req.params;
    const diary = await Diary.findById(diaryId);
    if (diary) {
      const weight = await Weight.find({ catId: diary._doc.catId }).sort({
        date: -1,
      });
      diary._doc.weight = weight;

      const goal = await Goal.find({ catId: diary._doc.catId }).sort({
        date: -1,
      });
      diary._doc.goal = goal;
      return res.status(200).json({ data: diary });
    } else {
      return res
        .status(500)
        .json({ message: "Cannot found diary with given id" });
    }
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

/**
 * @swagger
 * /diary/{diaryId}/list-food:
 *  get:
 *    summary: Get list food of diary id
 *    tags: [DiaryFood]
 *    parameters:
 *      - in: path
 *        name: diaryId
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
 *                  $ref: '#/components/schemas/ListFood'
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

router.get("/:diaryId/list-food", async (req, res) => {
  try {
    const { diaryId } = req.params;
    const listFood = await FedFood.find({ diaryId: diaryId });
    return res.status(200).json({ data: listFood });
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

/**
 * @swagger
 * /diary/add-food/{diaryId}:
 *  post:
 *    summary: Add food to diary page
 *    tags: [DiaryFood]
 *    parameters:
 *      - in: path
 *        name: diaryId
 *        schema:
 *          type: string
 *        required: true
 *        description: Identify Diary
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/FedFoodAdd'
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

router.post("/add-food/:diaryId", async (req, res) => {
  const { diaryId } = req.params;
  const { name, amount, calories } = req.body;
  try {
    const dbFedFood = new FedFood({
      diaryId: diaryId,
      name: name,
      amount: amount,
      calories: calories,
    });

    // Save fed food to db
    await dbFedFood.save();
    Diary.findByIdAndUpdate(diaryId, { $inc: { food_calories: calories } });
    res.status(200).json({ data: dbFedFood });
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

/**
 * @swagger
 * /diary/change-water-amount/{diaryId}:
 *  put:
 *    summary: Change water amount
 *    tags: [DiaryChangeWaterAmount]
 *    parameters:
 *      - in: path
 *        name: diaryId
 *        schema:
 *          type: string
 *        required: true
 *        description: Identify Diary
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

router.put("/change-water-amount/:diaryId", async (req, res) => {
  const { diaryId } = req.params;
  const { amount } = req.body;
  const diary = await Diary.find({ diaryId: diaryId });
  Diary.findByIdAndUpdate(diaryId, { water_amount: amount })
    .then(() => res.status(200).json({ message: "Update successful!" }))
    .catch((err) => res.status(500).json({ message: JSON.stringify(err) }));
});

/**
 * @swagger
 * /diary/exercise/{diaryId}:
 *  put:
 *    summary: Update exercise
 *    tags: [DiaryExercise]
 *    parameters:
 *      - in: path
 *        name: diaryId
 *        schema:
 *          type: string
 *        required: true
 *        description: Identify Diary
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/DiaryExerciseUpdate'
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

router.put("/exercise/:diaryId", async (req, res) => {
  const { diaryId } = req.params;
  const { exercise } = req.body;
  Diary.findByIdAndUpdate(diaryId, { exercise: exercise })
    .then(() => res.status(200).json({ message: "Save Exercise successful!" }))
    .catch((err) => res.status(500).json({ message: JSON.stringify(err) }));
});

/**
 * @swagger
 * /diary/about/{diaryId}:
 *  put:
 *    summary: Update about
 *    tags: [DiaryAbout]
 *    parameters:
 *      - in: path
 *        name: diaryId
 *        schema:
 *          type: string
 *        required: true
 *        description: Identify Diary
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/DiaryAboutUpdate'
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

router.put("/about/:diaryId", async (req, res) => {
  const { diaryId } = req.params;
  const { about } = req.body;
  Diary.findByIdAndUpdate(diaryId, { about: about })
    .then(() => res.status(200).json({ message: "Save About successful!" }))
    .catch((err) => res.status(500).json({ message: JSON.stringify(err) }));
});

module.exports = router;
