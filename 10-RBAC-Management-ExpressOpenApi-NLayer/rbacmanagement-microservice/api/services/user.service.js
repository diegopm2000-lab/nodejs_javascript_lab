// user.service.js

const bcrypt = require('bcrypt');
const uniqid = require('uniqid');

const log = require('../infrastructure/logger/applicationLogger.gateway');
const userRepository = require('../repositories/user/mongo.user.repository');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[User Service]';

const BCRYPT_SALT_ROUNDS = 12;

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

async function getUserById(userId) {
  log.debug(`${MODULE_NAME}:${getUserById.name} (IN) -> userId: ${userId}`);

  const result = await userRepository.getUserByFilter({ id: userId });

  log.debug(`${MODULE_NAME}:${getUserById.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createUser(newUserIN) {
  log.info(`${MODULE_NAME}:${createUser.name} (IN) -> newUserIN: ${JSON.stringify(newUserIN)}`);

  // Check if there NOT exists an user with the same username
  const userFound = await userRepository.getUserByFilter({ username: newUserIN.username });
  log.info(`${MODULE_NAME}:${createUser.name} (MID) -> userFound: ${JSON.stringify(userFound)}`);
  if (userFound) {
    log.error(`${MODULE_NAME}:${createUser.name} (ERROR) -> error: ${ERROR_USER_EXISTS_WITH_SAME_USERNAME}`);
    throw new Error(ERROR_USER_EXISTS_WITH_SAME_USERNAME);
  }

  const newUser = JSON.parse(JSON.stringify(newUserIN));

  // Generate unique Id
  newUser.id = `user-${uniqid()}`;

  // Generate initDate
  newUser.initDate = new Date().toISOString();

  // Encrypt the password
  newUser.password = bcrypt.hashSync(newUserIN.password, BCRYPT_SALT_ROUNDS);

  const result = await userRepository.createUser(newUser);

  log.debug(`${MODULE_NAME}:${createUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function updateUser(userId, updateUserDataIN) {
  log.info(`${MODULE_NAME}:${updateUser.name} (IN) -> userId: ${userId}, updateUserDataIN: ${JSON.stringify(updateUserDataIN)}`);

  // Check if there NOT exists an user with the same username and distinct userId
  const userFound = await userRepository.getUserByFilter({ username: updateUserDataIN.username });
  log.info(`${MODULE_NAME}:${createUser.name} (MID) -> userFound: ${JSON.stringify(userFound)}`);
  if (userFound && userFound.id !== userId) {
    log.error(`${MODULE_NAME}:${createUser.name} (ERROR) -> error: ${ERROR_USER_EXISTS_WITH_SAME_USERNAME}`);
    throw new Error(ERROR_USER_EXISTS_WITH_SAME_USERNAME);
  }

  const updateUserData = JSON.parse(JSON.stringify(updateUserDataIN));

  // Encrypt the password
  const encryptedPassword = bcrypt.hashSync(updateUserDataIN.password, BCRYPT_SALT_ROUNDS);
  updateUserData.password = encryptedPassword;

  // Execute update
  const result = await userRepository.updateUser(userId, updateUserData);

  log.debug(`${MODULE_NAME}:${updateUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteUser(userId) {
  log.info(`${MODULE_NAME}:${deleteUser.name} (IN) -> userId: ${userId}`);

  const result = await userRepository.deleteUser(userId);

  log.debug(`${MODULE_NAME}:${deleteUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
