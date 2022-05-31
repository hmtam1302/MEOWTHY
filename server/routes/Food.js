const express = require("express");
const router = express.Router();
const Food = require("../models/Food");
const FedFood = require("../models/FedFood");

require("dotenv").config();


//Swagger Food schema
/**
 * @swagger
 * components:
 *  schemas:
 *    Food:
 *      type: object
 *      required:
 *        - name
 *        - amount
 *        - calories
 *      properties:
 *        name:
 *          type: string
 *          description: food name
 *        amount:
 *          type: number
 *          description: default unit g
 *        calories: 
 *          type: number
 *          description: Calories per amount kcal
 *      example:
 *        {
 *          name: "cơm",
 *          amount: 10,
 *          calories: 13
 *        }
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ListFood:
 *      type: array
 *      items:
 *         $ref: '#/components/schemas/Food'
 */

//------------------------------------------------------

/**
 * @swagger
 * /food:
 *  get:
 *    summary: Get all food available
 *    tags: [Food]
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
router.get("/", async (req, res) => {
  try {
      const listFood = await Food.find({});
      return res.status(200).json({ data: listFood });
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});



/**
 * @swagger
 * /food/{foodId}:
 *  put:
 *    summary: Change food in record
 *    tags: [FedFood]
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
 *            $ref: '#/components/schemas/FedFoodUpdate'
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
 *    tags: [FedFood]
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

 router.put("/:foodId", async (req, res) => {
  const { foodId } = req.params
  const { amount, calories } = req.body;
  const fed_food = await FedFood.find({ _id: foodId });
  const diary = await Diary.find({ diaryId: fed_food._doc.diaryId });
  if (diary.length === 0) {
    res.status(500).json({ message: "Diary at the date not found" });
  } else {
      diary._doc.food_calories += calories - fed_food._doc.calories;
      FedFood.findOneAndUpdate({ _id : foodId }, {amount : amount, calories : calories})
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


router.delete("/:foodId", async (req, res) => {
  const { foodId } = req.params;
  const response = await FedFood.find({ _id: foodId });
  const diary = await Diary.find({ diaryId: response._doc.diaryId });
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


module.exports = router;
