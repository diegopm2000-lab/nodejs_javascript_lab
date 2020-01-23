// authentication.repository.js

const bcrypt = require('bcrypt');

const jwtInfra = require('../../infrastructure/jwt.infra');
const log = require('../../infrastructure/logger/applicationLogger.gateway');
const userRepository = require('../user/mongo.user.repository');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Authentication Repository]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function authenticate(username, passwd) {
  log.debug(`${MODULE_NAME}:${authenticate.name} (IN) -> username: ${username}, passwd: ${passwd}`);

  // First check if exists user in user repository
  const userFound = await userRepository.getUserByFilter({ username });

  // Check if user found
  if (!userFound) {
    log.error(`${MODULE_NAME}:${authenticate.name} (ERROR) -> User not found`);
    throw new Error('User not found');
  }

  // Verify passwd
  const passwdIsOK = await bcrypt.compare(passwd, userFound.password);
  if (!passwdIsOK) {
    log.error(`${MODULE_NAME}:${authenticate.name} (ERROR) -> Bad password`);
    throw new Error('Bad password');
  }

  // Generate JWT Token
  const token = jwtInfra.generateToken({ username });

  log.debug(`${MODULE_NAME}:${authenticate.name} (OUT) -> token: ${JSON.stringify(token)}`);
  return token;
}

module.exports = {
  authenticate,
};
