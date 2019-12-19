// mongo.user.repository.js

const log = require('../../infrastructure/logger/applicationLogger.gateway');
const mongoHelper = require('../../helpers/mongoose.helper');
const { User } = require('./mongo.user'); // User Schema

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Mongo User Repository]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getUsers() {
  log.debug(`${MODULE_NAME}:${getUsers.name} (IN) -> params: no params`);

  const result = await mongoHelper.getAll(User);

  log.debug(`${MODULE_NAME}:${getUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getUserByFilter(filter) {
  log.debug(`${MODULE_NAME}:${getUserByFilter.name} (IN) -> filter: ${JSON.stringify(filter)}`);

  const result = await mongoHelper.getByFilter(User, filter);

  log.debug(`${MODULE_NAME}:${getUserByFilter.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createUser(newUser) {
  log.debug(`${MODULE_NAME}:${createUser.name} (IN) -> newUser: ${JSON.stringify(newUser)}`);

  const result = await mongoHelper.create(User, newUser);

  log.info(`${MODULE_NAME}:${createUser.name} (OUT) -> result: ${JSON.stringify(newUser)}`);
  return result;
}

async function updateUser(id, userData) {
  log.info(`${MODULE_NAME}:${updateUser.name} (IN) -> id: ${id}, userData: ${JSON.stringify(userData)}`);

  const result = await mongoHelper.update(User, id, userData);

  log.info(`${MODULE_NAME}:${updateUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteUser(id) {
  log.debug(`${MODULE_NAME}:${deleteUser.name} (IN) -> id: ${id}`);

  const result = await mongoHelper.deleteById(User, id);

  log.debug(`${MODULE_NAME}:${deleteUser.name} (OUT) -> result: ${result}`);
  return result;
}

module.exports = {
  getUsers,
  getUserByFilter,
  createUser,
  updateUser,
  deleteUser,
};
