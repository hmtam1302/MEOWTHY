const express = require("express");
const router = express.Router();
const User = require("../models/User");
//Encrypt password
const bcrypt = require("bcrypt");

//Swagger User schema
/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          description: Username
 *        password:
 *          type: string
 *          description: User password
 *        email:
 *          type: string
 *          description: User email
 *        phone:
 *          type: string
 *          description: User mobile phone
 *      example:
 *        username: username
 *        password: "123456"
 *        email: user@email.com
 *        phone: "0123456789"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserUpdateInformation:
 *      type: object
 *      required:
 *        - username
 *      properties:
 *        username:
 *          type: string
 *          description: Username
 *        email:
 *          type: string
 *          description: User email
 *        phone:
 *          type: string
 *          description: User mobile phone
 *      example:
 *        username: username
 *        email: user@email.com
 *        phone: 0123456789
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserChangePassword:
 *      type: object
 *      required:
 *        - username
 *        - oldPassword
 *        - newPassword
 *      properties:
 *        username:
 *          type: string
 *          description: Username
 *        oldPassword:
 *          type: string
 *          description: Old user password
 *        newPassword:
 *          type: string
 *          description: New user password
 *      example:
 *        username: username
 *        oldPassword: "123456"
 *        newPassword: "654321"
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSignIn:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          description: Username
 *        password:
 *          type: string
 *          description: User password
 *      example:
 *        username: username
 *        password: "123456"
 */
//------------------------------------------------------



/**
 * @swagger
 * /user/{username}:
 *  get:
 *    summary: Get user information
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: username
 *        schema:
 *          type: string
 *        required: true
 *        description: Username
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  $ref: '#/components/schemas/User'
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
router.get('/:username', async (req, res) => {
  const response = await User.find({ username: req.params.username });
  if (response.length > 0)
    res.status(200).json({ data: response[0] });
  else res.status(500).json({ error: 'Not found username' })
})

/**
 * @swagger
 * /user/signup:
 *  post:
 *    summary: Signup new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/User'
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
router.post("/signup", async (req, res) => {
  const { username, password, email, phone } = req.body;
  const response = await User.find({ username });
  if (response.length > 0) {
    res.status(500).json({ message: "Username has been registered!" });
  } else {
    try {
      const user = new User({
        username: username,
        password: bcrypt.hashSync(password, 10),
        email,
        phone
      });

      user
        .save()
        .then(() => res.status(200).json({ message: "Signup success!" }))
        .catch((err) =>
          res
            .status(500)
            .json({ message: err })
        );
    } catch (err) { res.status(500).json({ message: err }) };
  }
});

/**
 * @swagger
 * /user/signin:
 *  post:
 *    summary: Signup new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/UserSignIn'
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
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const response = await User.find({ username });
  if (response.length == 0) {
    res.status(500).json({ message: "Username has been registered!" });
  } else {
    try {
      if (bcrypt.compareSync(password, response[0].password)) {
        res.status(200).json({ message: "Login success!" });
      } else {
        res.status(500).json({ message: "Wrong password!" });
      }
    } catch (err) { res.status(500).json({ message: err }) };
  }
});

/**
 * @swagger
 * /user/update:
 *  put:
 *    summary: Update user information
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/UserUpdateInformation'
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
router.put("/update", async (req, res) => {
  const { username } = req.body;
  const response = await User.find({ username });
  if (response.length == 0) {
    res.status(500).json({ message: "User not found" });
  } else {
    User.findOneAndUpdate({ username }, req.body)
      .then(() => res.status(200).json({ message: "Update successful!" }))
      .catch((err) =>
        res
          .status(500)
          .json({ message: err })
      );
  }
});

/**
 * @swagger
 * /user/{username}:
 *  delete:
 *    summary: Delete user
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: username
 *        schema:
 *          type: string
 *        required: true
 *        description: Username
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
router.delete("/:username", async (req, res) => {
  const { username } = req.params;
  const response = await User.find({ username });
  if (response.length == 0) {
    res.status(500).json({ message: "User not found" });
  } else {
    User.findOneAndDelete({ username })
      .then(() => res.status(200).json({ message: "Delete user successful!" }))
      .catch((err) =>
        res
          .status(500)
          .json({ message: err })
      );
  }
});

/**
 * @swagger
 * /user/change-password:
 *  put:
 *    summary: Change user password
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json: 
 *          schema:
 *            $ref: '#/components/schemas/UserChangePassword'
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
router.put("/change-password", async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const response = await User.find({ username });
  //Check password
  if (response.length === 0) {
    res.status(500).json({ message: "User not found!" });
  } else {
    //Check password
    try {
      if (bcrypt.compareSync(oldPassword, response[0].password)) {
        //Accept change password
        const hashPassword = bcrypt.hashSync(newPassword, 10);
        await User.findOneAndUpdate(
          { username },
          { password: hashPassword }
        );
        res.status(200).json({ message: "Change password success!" });
      } else {
        res.status(500).json({ message: "Wrong old password! Try again" });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
});

module.exports = router;