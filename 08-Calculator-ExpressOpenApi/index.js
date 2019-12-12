// index.js

const express = require('express');
const { initialize } = require('express-openapi');

const Log = require('log-color');

const app = express();

const MODULE_NAME = '[index]';

const log = new Log({ level: 'debug', color: true });

initialize({
  app,
  apiDoc: './swagger.yml',
  operations: {
    add(req, res) {
      const { a, b } = req.query;

      log.debug(`${MODULE_NAME}:add (IN) --> a: ${a}, b: ${b}`);

      const result = a + b;

      log.debug(`${MODULE_NAME}:add (OUT) --> result: ${result}`);

      res.send({ result });
    },
    substract(req, res) {
      const { a, b } = req.query;

      log.debug(`${MODULE_NAME}:substract (IN) --> a: ${a}, b: ${b}`);

      const result = a - b;

      log.debug(`${MODULE_NAME}:substract (OUT) --> result: ${result}`);

      res.send({ result });
    },
    multiply(req, res) {
      const { a, b } = req.query;

      log.debug(`${MODULE_NAME}:multiply (IN) --> a: ${a}, b: ${b}`);

      const result = a * b;

      log.debug(`${MODULE_NAME}:multiply (OUT) --> result: ${result}`);

      res.send({ result });
    },
    divide(req, res) {
      const { a, b } = req.query;

      log.debug(`${MODULE_NAME}:division (IN) --> a: ${a}, b: ${b}`);

      // Check division by zero
      if (b === 0) {
        log.error(`${MODULE_NAME}:division (ERROR) --> Division by zero not allowed!`);
        const newError = { status: 400, message: 'Division by zero not allowed' };
        throw newError;
      // Another case
      } else {
        const result = a / b;
        log.debug(`${MODULE_NAME}:division (OUT) --> result: ${result}`);
        res.send({ result });
      }
    },
  },
});

// Error Handler

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  log.debug(`${MODULE_NAME}:ErrorHandler (ERROR) --> err: ${JSON.stringify(err)}`);
  res.status(err.status).json(err);
});

app.listen(3000);
