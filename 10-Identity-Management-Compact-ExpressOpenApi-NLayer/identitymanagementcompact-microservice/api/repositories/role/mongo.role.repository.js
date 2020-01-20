// mongo.role.repository.js

const log = require('../../infrastructure/logger/applicationLogger.gateway');
const mongoHelper = require('../../helpers/mongoose.helper');
const { Role } = require('./mongo.role'); // Role Schema

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Mongo Role Repository]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getRoles() {
  log.debug(`${MODULE_NAME}:${getRoles.name} (IN) -> params: no params`);

  const result = await mongoHelper.getAll(Role);

  log.debug(`${MODULE_NAME}:${getRoles.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getRoleByFilter(filter) {
  log.debug(`${MODULE_NAME}:${getRoleByFilter.name} (IN) -> filter: ${JSON.stringify(filter)}`);

  const result = await mongoHelper.getByFilter(Role, filter);

  log.debug(`${MODULE_NAME}:${getRoleByFilter.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createRole(newRole) {
  log.debug(`${MODULE_NAME}:${createRole.name} (IN) -> newRole: ${JSON.stringify(newRole)}`);

  const result = await mongoHelper.create(Role, newRole);

  log.info(`${MODULE_NAME}:${createRole.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function updateRole(id, roleData) {
  log.info(`${MODULE_NAME}:${updateRole.name} (IN) -> id: ${id}, roleData: ${JSON.stringify(roleData)}`);

  const result = await mongoHelper.update(Role, id, roleData);

  log.info(`${MODULE_NAME}:${updateRole.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteRole(id) {
  log.debug(`${MODULE_NAME}:${deleteRole.name} (IN) -> id: ${id}`);

  const result = await mongoHelper.deleteById(Role, id);

  log.debug(`${MODULE_NAME}:${deleteRole.name} (OUT) -> result: ${result}`);
  return result;
}

async function addEndpointToRole(roleId, endpointId) {
  log.debug(`${MODULE_NAME}:${addEndpointToRole.name} (IN) -> roleId: ${roleId}, endpointId: ${endpointId}`);

  const roleFound = await getRoleByFilter({ id: roleId });

  // Check if role found
  // TODO

  // Check if endpoint found
  // TODO

  let result = roleFound;

  // TODO modificar esto usando una funcion auxiliar que para una lista añada el elemento si no existe

  // Check if group endpoints contains the endpointId
  const endpointIdFound = roleFound.endpoints.find(x => x === endpointId);
  if (!endpointIdFound) {
    roleFound.endpoints.push(endpointId);
    result = await mongoHelper.update(Role, roleId, roleFound);
  }

  log.debug(`${MODULE_NAME}:${addEndpointToRole.name} (OUT) -> result: ${result}`);
  return result;
}

async function deleteEndpointFromRole(roleId, endpointId) {
  log.debug(`${MODULE_NAME}:${deleteEndpointFromRole.name} (IN) -> roleId: ${roleId}, endpointId: ${endpointId}`);

  const roleFound = await getRoleByFilter({ id: roleId });

  // Check if role found
  // TODO

  // Check if endpoint found
  // TODO

  let result = roleFound;

  // Check if roles contains the roleId
  const endpointIdFound = roleFound.endpoints.find(x => x === endpointId);
  if (endpointIdFound) {
    roleFound.endpoints = roleFound.endpoints.filter(e => e !== endpointId);
    result = await mongoHelper.update(Role, roleId, roleFound);
  }

  log.debug(`${MODULE_NAME}:${deleteEndpointFromRole.name} (OUT) -> result: ${result}`);
  return result;
}

module.exports = {
  getRoles,
  getRoleByFilter,
  createRole,
  updateRole,
  deleteRole,
  addEndpointToRole,
  deleteEndpointFromRole,
};
