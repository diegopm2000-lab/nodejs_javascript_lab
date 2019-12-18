// auth.controller.js

const log = require('../infrastructure/logger/applicationLogger.gateway');
const authService = require('../services/auth.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Auth Controller]';

const USER_NOT_AUTHENTICATED = 'User not authenticated';
const USER_NOT_AUTHORIZED = 'User not authorized';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function authenticate(req, res) {
  const { username, passwd } = req.headers;
  log.debug(`${MODULE_NAME}:${authenticate.name} (IN) -> username: ${username}, passwd: <<obfuscated>>`);

  const result = await authService.authenticate(username, passwd);

  if (!result) {
    res.status(401).json({ result: `${USER_NOT_AUTHENTICATED}` });
  } else {
    res.json(result);
  }
}

async function authorize(req, res) {
  const { username, endpoint } = req.headers;
  log.debug(`${MODULE_NAME}:${authenticate.name} (IN) -> username: ${username}, endpoint: ${endpoint}`);

  const result = await authService.authorize(username, endpoint);

  if (!result) {
    res.status(403).json({ result: `${USER_NOT_AUTHORIZED}` });
  } else {
    res.json({ result });
  }
}

module.exports = {
  authenticate,
  authorize,
};
