// openApiExpress.bootstrap.js

const log = require('../infrastructure/logger/applicationLogger.gateway');
const configService = require('../services/config.service');
const openApiExpressInfra = require('../infrastructure/openApiExpress.infra');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[OpenApiExpress Bootstrap]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

async function init(envPort) {
  log.info(`${MODULE_NAME} ${init.name} (IN) --> envPort: ${envPort}`);

  const expressOptions = configService.getExpressConfig();

  // Change port from environment properties
  if (envPort) {
    expressOptions.port = envPort;
  }

  await openApiExpressInfra.start(expressOptions);

  log.info(`${MODULE_NAME} ${init.name} (OUT) --> OK`);
}

module.exports = {
  init,
};
