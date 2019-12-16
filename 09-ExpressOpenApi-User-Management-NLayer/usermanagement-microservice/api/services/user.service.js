// user.service.js

const log = require('../infrastructure/logger/applicationLogger.gateway');
const userRepository = require('../repositories/user/mongo.user.repository');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[User Service]';

const ERROR_USER_EXISTS_WITH_SAME_USERNAME = 'User exists with the same username';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getUsers() {
  log.debug(`${MODULE_NAME}:${getUsers.name} (IN) -> no params`);

  const result = await userRepository.getUsers();

  log.debug(`${MODULE_NAME}:${getUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createUser(newUserIN) {
  log.info(`${MODULE_NAME}:${createUser.name} (IN) -> newUserIN: ${JSON.stringify(newUserIN)}`);

  // Check if there NOT exists an user with the same username
  const userFound = await userRepository.getUserByFilter({ username: newUserIN.username });
  log.info(`${MODULE_NAME}:${createUser.name} (MID) -> userFound: ${JSON.stringify(userFound)}`);
  if (userFound) {
    throw new Error(ERROR_USER_EXISTS_WITH_SAME_USERNAME);
  }

  const result = await userRepository.createUser(newUserIN);

  log.debug(`${MODULE_NAME}:${createUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}
module.exports = {
  getUsers,
  createUser,
};
