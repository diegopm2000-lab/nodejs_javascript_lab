// openApiExpress.infra.js

const cors = require('cors');
const express = require('express');
const { initialize } = require('express-openapi');

const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const YAML = require('yamljs');

const log = require('../infrastructure/logger/applicationLogger.gateway');
const securityHelper = require('../helpers/security.helper');
const userController = require('../controllers/user.controller');
const groupController = require('../controllers/group.controller');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[OpenApiExpress Infra]';

const API_DOCUMENT = './api/swagger/swagger.yml';

const DEFAULT_PORT = 8080;
const DEFAULT_REQUEST_TIMEOUT = 50000;
const DEFAULT_SOCKET_TIMEOUT = 300000;

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

      const appPort = options.port || DEFAULT_PORT;
      module.exports.server = app.listen(appPort);

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
        consumesMiddleware: {
          'application/json': bodyParser.json(),
        },
        operations: {
          // Users
          createUser: userController.createUser,
          updateUser: userController.updateUser,
          getUsers: userController.getUsers,
          getUserById: userController.getUserById,
          deleteUser: userController.deleteUser,
          // Groups
          createGroup: groupController.createGroup,
          updateGroup: groupController.updateGroup,
          getGroups: groupController.getGroups,
          getGroupById: groupController.getGroupById,
          deleteGroup: groupController.deleteGroup,
        },
      });

      // Socket timeout
      module.exports.server.timeout = DEFAULT_SOCKET_TIMEOUT;

      // Request timeout
      const serverTimeOut = options.servertimeout || DEFAULT_REQUEST_TIMEOUT;
      module.exports.server.setTimeout(serverTimeOut);
      log.info(`${MODULE_NAME} ${start.name} (MID) --> Express Server timeout set to: ${serverTimeOut} ms`);

      // Enable CORS
      if (options.enableCors) {
        log.info(`${MODULE_NAME} ${start.name} (MID) --> Enabling CORS`);
        app.use(cors());
      }

      // Error Handler
      // eslint-disable-next-line no-unused-vars
      app.use((err, req, res, next) => {
        log.debug(`${MODULE_NAME}:ErrorHandler (ERROR) --> err: ${JSON.stringify(err)}`);
        res.status(err.status).json(err);
      });

      // Exposes documentation using swagger-ui-express
      const swaggerDocument = YAML.load(API_DOCUMENT);
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
