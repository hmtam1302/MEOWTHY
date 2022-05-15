const express = require("express");
const router = express.Router();
const Token = require("../models/Token");

//Swagger Token schema
/**
 * @swagger
 * components:
 *  schemas:
 *    ValidateToken:
 *      type: object
 *      required:
 *        - value
 *      properties:
 *        value:
 *          type: string
 *          description: Token value
 *      example:
 *        value: '123456'
 */
//------------------------------------------------------


/**
 * @swagger
 * /token/verify:
 *  post:
 *    summary: Verify a token
 *    tags: [Token]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/ValidateToken'
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
router.post("/verify", async (req, res) => {
  const { value } = req.body;
  const token = await Token.findOne({ value, verified: false, expireDate: { $gte: new Date() } });
  if (!token) {
    res.status(500).json({ message: "Token is invalid" });
  } else {
    try {
      Token.findOneAndUpdate({ value }, { verified: true })
        .then(() => res.status(200).json({ message: "Verified successfully!" }))
        .catch((err) =>
          res
            .status(500)
            .json({ message: err })
        );
    } catch (err) { res.status(500).json({ message: err }) };
  }
});

module.exports = router;