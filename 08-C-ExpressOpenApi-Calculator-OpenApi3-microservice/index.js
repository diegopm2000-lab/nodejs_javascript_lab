// index.js

const express = require('express');
const { initialize } = require('express-openapi');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const calculatorController = require('./calculator.controller');

const log = require('./logger');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[index]';
const API_DOCUMENT = './swagger.yml';

// //////////////////////////////////////////////////////////////////////////////
// INIT
// //////////////////////////////////////////////////////////////////////////////

log.defaultInit();

const app = express();

initialize({
  app,
  apiDoc: API_DOCUMENT,
  operations: {
    add: calculatorController.add,
    substract: calculatorController.substract,
    multiply: calculatorController.multiply,
    divide: calculatorController.divide,
  },
});

// Error Handler - necessary to handle the application errors

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  log.debug(`${MODULE_NAME}:ErrorHandler (ERROR) --> err: ${JSON.stringify(err)}`);
  res.status(err.status).json(err);
});

// Exposes documentation using swagger-ui-express

const swaggerDocument = YAML.load(API_DOCUMENT);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000);
