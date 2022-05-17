const express = require("express");
const app = express();
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Customer API',
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer"
      },
      servers: [
        {
          url: "http://localhost:5000"
        }
      ],
    },
  },
  apis: ['routes/*.js']
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes
const userRouter = require("./routes/User");
app.use("/user", userRouter);

const tokenRouter = require("./routes/Token");
app.use("/token", tokenRouter);

const catRouter = require("./routes/Cat");
app.use("/cat", catRouter);

//Connect to mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to mongodb atlas");
  })
  .catch((err) => {
    console.log("Something wrong happened!", err);
  });
app.listen(PORT, () => {
  console.log("Server started at PORT ", PORT);
});