const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Token = require("../models/Token");
const Cat = require('../models/Cat');
const Weight = require('../models/Weight');
const Goal = require('../models/Goal');

//Encrypt password
const bcrypt = require("bcrypt");
const randomToken = require('random-token');
const nodemailer = require("nodemailer");

require("dotenv").config();

//Swagger User schema
/**
 * @swagger
 * components:
 *  schemas:
 *    CatWeight:
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
 *    CatGoal:
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

/**
 * @swagger
 * components:
 *  schemas:
 *    Cat:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: Cat Id
 *        userId:
 *          type: string
 *          description: Cat's User Id
 *        age:
 *          type: number
 *          description: Cat age
 *        sex:
 *          type: string
 *          description: Cat sex
 *        breed:
 *          type: string
 *          description: Cat breed
 *        bio:
 *          type: string
 *          description: Cat bio
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
 *          _id: abc123456789,
 *          userId: user123456789,
 *          age: 1,
 *          sex: Đực,
 *          breed: Mèo ta,
 *          bio: Short bio,
 *          weight: [{
 *            _id: weight123456,         
 *            catId: abc123456789,
 *            catWeight: 1,    
 *            date: "2022-05-16T16:55:13.254Z",
 *          }],
 *          goal: [{
 *            _id: goal123456,        
 *            catId: abc123456789,
 *            catGoal: 1,    
 *            date: "2022-05-16T16:55:13.254Z",  
 *          }]
 *        }
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    ListCat:
 *      type: array
 *      items:
 *         $ref: '#/components/schemas/Cat'
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    CatAdd:
 *      type: object
 *      properties:
 *        catName:
 *          type: string
 *          description: Cat name
 *        userId:
 *          type: string
 *          description: Cat's User Id
 *        age:
 *          type: number
 *          description: Cat age
 *        sex:
 *          type: string
 *          description: Cat sex
 *        breed:
 *          type: string
 *          description: Cat breed
 *        bio:
 *          type: string
 *          description: Cat bio
 *        weight:
 *          type: number
 *          description: Cat weight
 *        goal:
 *          type: number
 *          description: Cat goal
 *      example:
 *        catName: Meow2
 *        userId: user123456789
 *        age: 1
 *        sex: Đực
 *        breed: Mèo ta
 *        bio: Short bio
 *        weight: 2
 *        goal: 1.5
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    CatUpdate:
 *      type: object
 *      properties:
 *        catName:
 *          type: string
 *          description: Cat name
 *        age:
 *          type: number
 *          description: Cat age
 *        sex:
 *          type: string
 *          description: Cat sex
 *        breed:
 *          type: string
 *          description: Cat breed
 *        bio:
 *          type: string
 *          description: Cat bio
 *        weight:
 *          type: number
 *          description: Cat weight
 *        goal:
 *          type: number
 *          description: Cat goal
 *      example:
 *        catName: Meow3
 *        age: 1
 *        sex: Cái
 *        breed: Mèo ta
 *        bio: Short bio
 *        weight: 2
 *        goal: 1.5
 */
//------------------------------------------------------



/**
 * @swagger
 * /cat/list-cat/{userId}:
 *  get:
 *    summary: Get list cat of user id
 *    tags: [Cat]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: UserId
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/ListCat'
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
router.get('/list-cat/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const listCat = await Cat.find({ userId });
    const data = await Promise.all(listCat.map(async cat => {
      const weight = await Weight.find({ catId: cat._id }).sort({ date: -1 });
      cat._doc.weight = weight;

      const goal = await Goal.find({ catId: cat._id }).sort({ date: -1 });
      cat._doc.goal = goal;
      return cat;
    }));
    return res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});


/**
 * @swagger
 * /cat/add-cat/{userId}:
 *  post:
 *    summary: Add a new cat to user id
 *    tags: [Cat]
 *    parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: string
 *        required: true
 *        description: UserId
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/CatAdd'
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
router.post('/add-cat/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { catName, age, sex, breed, bio, weight, goal } = req.body;

    // Save cat
    const dbCat = new Cat({
      userId, catName, age, sex, breed, bio
    })

    await dbCat.save();

    // Save weight
    const dbWeight = new Weight({
      catId: dbCat._id, catWeight: weight, date: new Date()
    })
    await dbWeight.save();

    // Save goal
    const dbGoal = new Goal({
      catId: dbCat._id, catGoal: goal, date: new Date()
    });
    await dbGoal.save();

    res.status(200).json({ message: "Create add successfully!" })

  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

/**
 * @swagger
 * /cat/update-cat/{catId}:
 *  put:
 *    summary: Update a cat
 *    tags: [Cat]
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
 *            $ref: '#/components/schemas/CatUpdate'
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
router.put('/update-cat/:catId', async (req, res) => {
  try {
    const { catId } = req.params;
    const { catName, age, sex, breed, bio, weight, goal } = req.body;

    // Save cat
    await Cat.findByIdAndUpdate(catId, { catName, age, sex, breed, bio, });

    // Save weight
    const dbWeight = new Weight({
      catId: catId, catWeight: weight, date: new Date()
    })
    await dbWeight.save();

    // Save goal
    const dbGoal = new Goal({
      catId: catId, catGoal: goal, date: new Date()
    });
    await dbGoal.save();

    res.status(200).json({ message: "Update cat successfully!" })

  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

/**
 * @swagger
 * /cat/delete-cat/{catId}:
 *  delete:
 *    summary: Delete a cat
 *    tags: [Cat]
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
router.delete('/delete-cat/:catId', async (req, res) => {
  try {
    const { catId } = req.params;

    // Delete cat
    await Cat.findByIdAndRemove(catId);

    // Delete weight
    await Weight.remove({ catId });

    // Delete goal
    await Goal.remove({ catId });

    res.status(200).json({ message: "Delete cat successfully!" })

  } catch (err) {
    res.status(500).json({ message: JSON.stringify(err) });
  }
});

module.exports = router;
