// openApiExpress.infra.js

const cors = require('cors');
const express = require('express');
const { initialize } = require('express-openapi');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const log = require('../infrastructure/logger/applicationLogger.gateway');

const securityHelper = require('../helpers/security.helper');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[OpenApiExpress Infra]';

const API_DOCUMENT = '../swagger/swagger.yml';

const DEFAULT_PORT = 8080;
const DEFAULT_TIMEOUT = 50000;

// //////////////////////////////////////////////////////////////////////////////
// PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

let server;

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

// Start Express Server, configuring healthcheck, private routing and Install Middleware
async function start(options) {
  return new Promise((resolve, reject) => {
    try {
      log.info(`${MODULE_NAME} ${start.name} (IN) --> options: ${JSON.stringify(options)}`);

      // Instance Expresss
      const app = express();

      // Init Security
      securityHelper.initSecurity(app);

      // Enable CORS
      if (options.enableCors) {
        log.info(`${MODULE_NAME} ${start.name} (MID) --> Enabling CORS`);
        app.use(cors());
      }

      // Initialize ExpressOpenApi
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

      log.info(`${MODULE_NAME} ${start.name} (OUT) --> App Server started at port: ${appPort} and Running OK!`);

      resolve(true);
    } catch (error) {
      log.error(`${MODULE_NAME} ${start.name} (ERROR) --> error: ${error.stack}`);
      reject(new Error('Express did not start correctly!'));
    }
  });
}

function stop() {
  log.info(`${MODULE_NAME} ${stop.name} (IN) --> no params`);

  module.exports.server.close(() => { log.info(`${MODULE_NAME} ${stop.name} (OUT) --> App Server stopped`); });
}

module.exports = {
  server,
  start,
  stop,
};
