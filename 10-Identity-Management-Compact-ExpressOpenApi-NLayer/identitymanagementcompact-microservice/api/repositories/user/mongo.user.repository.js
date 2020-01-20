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

async function addGroupToUser(userId, groupId) {
  log.debug(`${MODULE_NAME}:${addGroupToUser.name} (IN) -> userId: ${userId}, groupId: ${groupId}`);

  const userFound = await getUserByFilter({ id: userId });

  // Check if user found
  // TODO

  // Check if groupId found
  // TODO

  let result = userFound;

  // TODO modificar esto usando una funcion auxiliar que para una lista añada el elemento si no existe

  // Check if user groups contains the groupId
  const groupIdFound = userFound.groups.find(x => x === groupId);
  if (!groupIdFound) {
    userFound.groups.push(groupId);
    result = await mongoHelper.update(User, userId, userFound);
  }

  log.debug(`${MODULE_NAME}:${addGroupToUser.name} (OUT) -> result: ${result}`);
  return result;
}

async function deleteGroupFromUser(userId, groupId) {
  log.debug(`${MODULE_NAME}:${deleteGroupFromUser.name} (IN) -> userId: ${userId}, groupId: ${groupId}`);

  const userFound = await getUserByFilter({ id: userId });

  // Check if user found
  // TODO

  // Check if groupId found
  // TODO

  let result = userFound;

  // TODO modificar esto usando una funcion auxiliar que para una lista elimine el elemento si no existe

  // Check if user groups contains the groupId
  const groupIdFound = userFound.groups.find(x => x === groupId);
  if (groupIdFound) {
    userFound.groups = userFound.groups.filter(e => e !== groupId);
    result = await mongoHelper.update(User, userId, userFound);
  }

  log.debug(`${MODULE_NAME}:${deleteGroupFromUser.name} (OUT) -> result: ${result}`);
  return result;
}

module.exports = {
  getUsers,
  getUserByFilter,
  createUser,
  updateUser,
  deleteUser,
  addGroupToUser,
  deleteGroupFromUser,
};
