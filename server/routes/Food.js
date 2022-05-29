const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

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
 *        name: "cơm",
 *        amount: 10,
 *        calories: 13
 */
//------------------------------------------------------


router.get("/food", async (req, res) => {
  try {
      const listFood = await Food.find({});
      return res.status(200).json({ data: listFood });
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});
