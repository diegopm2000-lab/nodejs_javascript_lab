// user.controller.js

const log = require('../infrastructure/logger/applicationLogger.gateway');
const userService = require('../services/user.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[User Controller]';

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
// //////////////////////////////////////////////////////////////////////////////

function buildUserParams(objIN) {
  const result = {
    username: objIN.username,
    password: objIN.password,
    enabled: objIN.enabled,
    initDate: objIN.initDate,
    groups: objIN.groups,
  };
  return result;
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getUsers(req, res) {
  log.debug(`${MODULE_NAME}:${getUsers.name} (IN) -> no params`);

  const result = await userService.getUsers();

  log.debug(`${MODULE_NAME}:${getUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function getUserById(req, res) {
  const { userId } = req.params;
  log.debug(`${MODULE_NAME}:${getUsers.name} (IN) -> userId: ${userId}`);

  const result = await userService.getUserById(userId);

  log.debug(`${MODULE_NAME}:${getUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function createUser(req, res) {
  const { body } = req;
  log.debug(`${MODULE_NAME}:${createUser.name} (IN) -> body: ${JSON.stringify(body)}`);

  const newUserParams = buildUserParams(body);

  const result = await userService.createUser(newUserParams);

  log.debug(`${MODULE_NAME}:${createUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function updateUser(req, res) {
  const { body } = req;
  const { userId } = req.params;

  log.debug(`${MODULE_NAME}:${updateUser.name} (IN) -> userId: ${userId}, body: ${JSON.stringify(body)}`);

  const userParams = buildUserParams(body);

  const result = await userService.updateUser(userId, userParams);

  log.debug(`${MODULE_NAME}:${updateUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function deleteUser(req, res) {
  const { userId } = req.params;
  log.debug(`${MODULE_NAME}:${getUsers.name} (IN) -> userId: ${userId}`);

  const result = await userService.deleteUser(userId);

  log.debug(`${MODULE_NAME}:${updateUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json({ result });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
