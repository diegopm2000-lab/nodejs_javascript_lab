// auth.service.js

const log = require('../infrastructure/logger/applicationLogger.gateway');

const authRepository = require('../repositories/auth/auth.repository');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Auth Service]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function authenticate(username, passwd) {
  log.debug(`${MODULE_NAME}:${authenticate.name} (IN) -> username: ${username}, passwd: ${passwd}`);

  const result = await authRepository.authenticate(username, passwd);

  log.debug(`${MODULE_NAME}:${authenticate.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  authenticate,
};
