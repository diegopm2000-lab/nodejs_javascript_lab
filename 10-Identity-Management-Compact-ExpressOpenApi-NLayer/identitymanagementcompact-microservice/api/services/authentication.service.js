// authentication.service.js

const log = require('../infrastructure/logger/applicationLogger.gateway');

const authenticationRepository = require('../repositories/authentication/mongo.authentication.repository');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Auth Service]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function authenticate(username, passwd) {
  log.debug(`${MODULE_NAME}:${authenticate.name} (IN) -> username: ${username}, passwd: ${passwd}`);

  const result = await authenticationRepository.authenticate(username, passwd);

  log.debug(`${MODULE_NAME}:${authenticate.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  authenticate,
};
