// index.js

const express = require('express');
const { initialize } = require('express-openapi');

const OpenValidator = require('express-openapi-validator').OpenApiValidator;

const Log = require('log-color');

const app = express();

const MODULE_NAME = '[index]';

const log = new Log({ level: 'debug', color: true });

initialize({
  app,
  apiDoc: './swagger.yml',
  operations: {
    // Add
    add(req, res) {
      const { a, b } = req.query;

      log.debug(`${MODULE_NAME}:add (IN) --> a: ${a}, b: ${b}`);

      const result = a + b;

      log.debug(`${MODULE_NAME}:add (OUT) --> result: ${result}`);

      res.send({ result });
    },
  },
});

app.listen(3000);
