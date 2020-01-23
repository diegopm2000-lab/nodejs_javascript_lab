// authentication.controller.js

const log = require('../infrastructure/logger/applicationLogger.gateway');
const authService = require('../services/authentication.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Auth Controller]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function authenticate(req, res) {
  const { username, passwd } = req.headers;
  log.debug(`${MODULE_NAME}:${authenticate.name} (IN) -> username: ${username}, passwd: ${passwd}`);

  const token = await authService.authenticate(username, passwd);

  const result = { token };

  log.debug(`${MODULE_NAME}:${authenticate.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

module.exports = {
  authenticate,
};
