// group.controller.js

const log = require('../infrastructure/logger/applicationLogger.gateway');
const groupService = require('../services/group.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Group Controller]';

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
// //////////////////////////////////////////////////////////////////////////////

function buildGroupParams(objIN) {
  const result = {
    name: objIN.name,
    roles: objIN.roles,
  };
  return result;
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getGroups(req, res) {
  log.debug(`${MODULE_NAME}:${getGroups.name} (IN) -> no params`);

  const result = await groupService.getGroups();

  log.debug(`${MODULE_NAME}:${getGroups.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function getGroupById(req, res) {
  const { groupId } = req.params;
  log.debug(`${MODULE_NAME}:${getGroups.name} (IN) -> groupId: ${groupId}`);

  const result = await groupService.getGroupById(groupId);

  log.debug(`${MODULE_NAME}:${getGroups.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function createGroup(req, res) {
  const { body } = req;
  log.debug(`${MODULE_NAME}:${createGroup.name} (IN) -> body: ${JSON.stringify(body)}`);

  const newGroupParams = buildGroupParams(body);

  const result = await groupService.createGroup(newGroupParams);

  log.debug(`${MODULE_NAME}:${createGroup.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function updateGroup(req, res) {
  const { body } = req;
  const { groupId } = req.params;

  log.debug(`${MODULE_NAME}:${updateGroup.name} (IN) -> groupId: ${groupId}, body: ${JSON.stringify(body)}`);

  const groupParams = buildGroupParams(body);

  const result = await groupService.updateGroup(groupId, groupParams);

  log.debug(`${MODULE_NAME}:${updateGroup.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function deleteGroup(req, res) {
  const { groupId } = req.params;
  log.debug(`${MODULE_NAME}:${getGroups.name} (IN) -> groupId: ${groupId}`);

  const result = await groupService.deleteGroup(groupId);

  log.debug(`${MODULE_NAME}:${updateGroup.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json({ result });
}

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
};
