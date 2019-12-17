// mongo.user.repository.js

const mongoose = require('mongoose');

const log = require('../../infrastructure/logger/applicationLogger.gateway');
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

  // Get verbose for queries -- For testing
  mongoose.set('debug', true);

  const query = User.find({});

  // Executing query
  const result = await query.exec();


  log.debug(`${MODULE_NAME}:${getUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getUserByFilter(filter) {
  log.debug(`${MODULE_NAME}:${getUserByFilter.name} (IN) -> filter: ${JSON.stringify(filter)}`);

  const result = await User.findOne(filter);

  log.debug(`${MODULE_NAME}:${getUserByFilter.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createUser(newUser) {
  log.debug(`${MODULE_NAME}:${createUser.name} (IN) -> newUser: ${JSON.stringify(newUser)}`);

  const result = await User.create(newUser);

  log.info(`${MODULE_NAME}:${createUser.name} (OUT) -> result: ${JSON.stringify(newUser)}`);
  return result;
}

async function updateUser(id, userData) {
  log.info(`${MODULE_NAME}:${updateUser.name} (IN) -> id: ${id}, userData: ${JSON.stringify(userData)}`);

  const result = await User.findOneAndUpdate(
    { id },
    { $set: userData },
    { new: true },
  );

  log.info(`${MODULE_NAME}:${updateUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteUser(id) {
  log.debug(`${MODULE_NAME}:${deleteUser.name} (IN) -> id: ${id}`);

  const innerResult = await User.deleteOne({ id });
  log.debug(`${MODULE_NAME}:${deleteUser.name} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  let result = false;
  if (innerResult.ok === 1 && innerResult.deletedCount === 1) {
    result = true;
  }

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
