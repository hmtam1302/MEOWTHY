# Server

## Description

This is server implementation of MEOWTHY Project.
[ExpressJS](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial) are used for implementation.

## How to run

**Prerequisites:** NodeJS (v14 or later).

### **Step 1**: *Config env file*

After cloning, copy file `.env.dist` as `.env` and configure your MongoDB URI.

*If you want to connect to our database, contact leader for more information.*

### **Step 2**: *Install required packages*

Use command `npm install` (or `yarn install`).

### **Step 3**: *Start server*

There are 2 ways:

- *Develop*: using command `npm run dev` (or `yarn run dev`).
- *Production*: using command `npm run prod` (or `yarn run prod`)

If start is successful, your command line output will look like the image below:

![Starting successfully](/server/image/start_success.png)

## Project structure

```project_structure
.
├── image                   # README images
├── models                  # Database models implementation
├── routes                  # API routing
├── .env                    # Environment file
├── .env.dist               # Sample environment file
├── package.json            # Project package file
└── index.js                # Entry point
```

## Swagger API UI

When starting server, you can check api docs on: [**http://localhost:3000/api-docs**](http://localhost:3000/api-docs)

## Additional packages

- [**brcypt**](https://www.npmjs.com/package/bcrypt): A library to help you hash passwords.
- [**nodemon**](https://www.npmjs.com/package/nodemon): nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [**dotenv**](https://www.npmjs.com/package/dotenv): Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- [**swagger-ui-express**](https://www.npmjs.com/package/swagger-ui-express): Serve auto-generated swagger-ui generated API docs from express.
- [**swagger-jsdoc**](https://www.npmjs.com/package/swagger-jsdoc): This library reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification.
