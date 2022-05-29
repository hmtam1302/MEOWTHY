const express = require("express");
const router = express.Router();
const Weight = require('../models/Weight');
const Goal = require('../models/Goal');

require("dotenv").config();


//Swagger Goal, Weight schema
/**
 * @swagger
 * components:
 *  schemas:
 *    CatWeightSet:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: CatWeight Id
 *        catId:
 *          type: string
 *          description: Cat's Id
 *        catWeight:
 *          type: number
 *          description: Cat weight
 *        date:
 *          type: date
 *          description: Cat weight create date
 *      example:
 *        _id: weight123456789
 *        catId: cat123456789
 *        catWeight: 1.5
 *        date: "2022-05-16T16:55:13.254Z"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    CatGoalSet:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: CatWeight Id
 *        catId:
 *          type: string
 *          description: Cat's Id
 *        catGoal:
 *          type: number
 *          description: Cat goal weight
 *        date:
 *          type: date
 *          description: Cat goal create date
 *      example:
 *        _id: weight123456789
 *        catId: cat123456789
 *        catGoal: 1.5
 *        date: "2022-05-16T16:55:13.254Z"
 */
//------------------------------------------------------


/**
 * @swagger
 * /cat/set-goal/{catId}:
 *  post:
 *    summary: Add a new goal to cat id
 *    tags: [CatGoal]
 *    parameters:
 *      - in: path
 *        name: catId
 *        schema:
 *          type: string
 *        required: true
 *        description: Cat Id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/CatGoalSet'
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

router.post("/set-goal/:catId", async (req, res) => {
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


/**
 * @swagger
 * /cat/set-weight/{catId}:
 *  post:
 *    summary: Add a new weight to cat id
 *    tags: [CatWeight]
 *    parameters:
 *      - in: path
 *        name: catId
 *        schema:
 *          type: string
 *        required: true
 *        description: Cat Id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/CatWeightSet'
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

router.post("/cat/set-weight/:catId", async (req, res) => {
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
