// user.controller.js

const log = require('../infrastructure/logger/applicationLogger.gateway');
const userService = require('../services/user.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[User Controller]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getUsers(req, res) {
  log.debug(`${MODULE_NAME}:${getUsers.name} (IN) -> no params`);

  const result = await userService.getUsers();

  log.debug(`${MODULE_NAME}:${getUsers.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function createUser(req, res) {
  const { body } = req;

  log.debug(`${MODULE_NAME}:${createUser.name} (IN) -> body: ${JSON.stringify(body)}`);

  // TODO extraer del body los parámetros

  const result = await userService.createUser();

  log.debug(`${MODULE_NAME}:${createUser.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

function updateUser(req, res) {
  // TODO
  console.log('Entrando en updateUser...');
  res.json({ rresult: 'Not built yet!' });
}

function getUserById(req, res) {
  // TODO
  console.log('Entrando en getUserById...');
  res.json({ rresult: 'Not built yet!' });
}

function deleteUser(req, res) {
  // TODO
  console.log('Entrando en deleteUser...');
  res.json({ rresult: 'Not built yet!' });
}

module.exports = {
  createUser,
  updateUser,
  getUsers,
  getUserById,
  deleteUser,
};
