// role.controller.js

const log = require('../infrastructure/logger/applicationLogger.gateway');
const roleService = require('../services/role.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Role Controller]';

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
// //////////////////////////////////////////////////////////////////////////////

function buildRoleParams(objIN) {
  const result = {
    name: objIN.name,
    endpoints: objIN.endpoints,
  };
  return result;
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getRoles(req, res) {
  log.debug(`${MODULE_NAME}:${getRoles.name} (IN) -> no params`);

  const result = await roleService.getRoles();

  log.debug(`${MODULE_NAME}:${getRoles.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function getRoleById(req, res) {
  const { roleId } = req.params;
  log.debug(`${MODULE_NAME}:${getRoles.name} (IN) -> roleId: ${roleId}`);

  const result = await roleService.getRoleById(roleId);

  log.debug(`${MODULE_NAME}:${getRoles.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function createRole(req, res) {
  const { body } = req;
  log.debug(`${MODULE_NAME}:${createRole.name} (IN) -> body: ${JSON.stringify(body)}`);

  const newRoleParams = buildRoleParams(body);

  const result = await roleService.createRole(newRoleParams);

  log.debug(`${MODULE_NAME}:${createRole.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function updateRole(req, res) {
  const { body } = req;
  const { roleId } = req.params;

  log.debug(`${MODULE_NAME}:${updateRole.name} (IN) -> roleId: ${roleId}, body: ${JSON.stringify(body)}`);

  const roleParams = buildRoleParams(body);

  const result = await roleService.updateRole(roleId, roleParams);

  log.debug(`${MODULE_NAME}:${updateRole.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function deleteRole(req, res) {
  const { roleId } = req.params;
  log.debug(`${MODULE_NAME}:${getRoles.name} (IN) -> roleId: ${roleId}`);

  const result = await roleService.deleteRole(roleId);

  log.debug(`${MODULE_NAME}:${updateRole.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json({ result });
}

module.exports = {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
