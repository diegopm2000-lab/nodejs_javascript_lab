// auth.service.js

const bcrypt = require('bcrypt');

const log = require('../infrastructure/logger/applicationLogger.gateway');
const userRepository = require('../repositories/user/mongo.user.repository');
const jwtInfra = require('../infrastructure/jwt.infra');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Auth Service]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function authenticate(username, passwd) {
  log.debug(`${MODULE_NAME}:${authenticate.name} (IN) -> username: ${username}, passwd: <<obfuscated>>`);

  let passwordIsOK = false;

  const userFound = await userRepository.getUserByFilter({ username });
  if (userFound) {
    log.debug(`${MODULE_NAME}:${authenticate.name} (MID) -> userFound!`);
    passwordIsOK = await bcrypt.compare(passwd, userFound.password);
  }

  if (!passwordIsOK) {
    log.debug(`${MODULE_NAME}:${authenticate.name} (OUT) -> user not authenticated!`);
    return false;
  }

  // Generate token
  const token = jwtInfra.generateToken({ userInfo: username });

  const result = { token };
  log.debug(`${MODULE_NAME}:${authenticate.name} (OUT) -> result: ${result}`);
  return result;
}

async function authorize(username, endpoint) {
  log.debug(`${MODULE_NAME}:${authorize.name} (IN) -> username: ${username}, endpoint: ${endpoint}`);

  // TODO implement the authorization using the RBAC system
  return new Promise((resolve) => {
    if (username === 'baduser') {
      resolve(false);
    } else {
      resolve(true);
    }
  });
}

module.exports = {
  authenticate,
  authorize,
};
