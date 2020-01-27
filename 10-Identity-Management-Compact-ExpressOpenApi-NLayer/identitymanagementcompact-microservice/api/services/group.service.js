// group.service.js

const uniqid = require('uniqid');

const log = require('../infrastructure/logger/applicationLogger.gateway');
const groupRepository = require('../repositories/group/mongo.group.repository');
const roleRepository = require('../repositories/role/mongo.role.repository');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Group Service]';

const ERROR_GROUP_EXISTS_WITH_SAME_NAME = 'Group exists with the same name';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getGroups() {
  log.debug(`${MODULE_NAME}:${getGroups.name} (IN) -> no params`);

  const result = await groupRepository.getGroups();

  log.debug(`${MODULE_NAME}:${getGroups.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getGroupById(groupId) {
  log.debug(`${MODULE_NAME}:${getGroupById.name} (IN) -> groupId: ${groupId}`);

  const result = await groupRepository.getGroupByFilter({ id: groupId });

  log.debug(`${MODULE_NAME}:${getGroupById.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createGroup(newGroupIN) {
  log.info(`${MODULE_NAME}:${createGroup.name} (IN) -> newGroupIN: ${JSON.stringify(newGroupIN)}`);

  // Check if there NOT exists a group with the same name
  const groupFound = await groupRepository.getGroupByFilter({ name: newGroupIN.name });
  log.info(`${MODULE_NAME}:${createGroup.name} (MID) -> groupFound: ${JSON.stringify(groupFound)}`);
  if (groupFound) {
    log.error(`${MODULE_NAME}:${createGroup.name} (ERROR) -> error: ${ERROR_GROUP_EXISTS_WITH_SAME_NAME}`);
    throw new Error(ERROR_GROUP_EXISTS_WITH_SAME_NAME);
  }

  const newGroup = JSON.parse(JSON.stringify(newGroupIN));

  // Generate unique Id
  newGroup.id = `group-${uniqid()}`;

  const result = await groupRepository.createGroup(newGroup);

  log.debug(`${MODULE_NAME}:${createGroup.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function updateGroup(groupId, updateGroupDataIN) {
  log.info(`${MODULE_NAME}:${updateGroup.name} (IN) -> groupId: ${groupId}, updateGroupDataIN: ${JSON.stringify(updateGroupDataIN)}`);

  // Check if there NOT exists an group with the same name and distinct groupId
  const groupFound = await groupRepository.getGroupByFilter({ name: updateGroupDataIN.name, id: { $ne: groupId } });
  log.info(`${MODULE_NAME}:${createGroup.name} (MID) -> groupFound: ${JSON.stringify(groupFound)}`);
  if (groupFound) {
    log.error(`${MODULE_NAME}:${createGroup.name} (ERROR) -> error: ${ERROR_GROUP_EXISTS_WITH_SAME_NAME}`);
    throw new Error(ERROR_GROUP_EXISTS_WITH_SAME_NAME);
  }

  // Execute update
  const result = await groupRepository.updateGroup(groupId, updateGroupDataIN);

  log.debug(`${MODULE_NAME}:${updateGroup.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteGroup(groupId) {
  log.info(`${MODULE_NAME}:${deleteGroup.name} (IN) -> groupId: ${groupId}`);

  const result = await groupRepository.deleteGroup(groupId);

  log.debug(`${MODULE_NAME}:${deleteGroup.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function addRoleToGroup(groupId, roleId) {
  log.debug(`${MODULE_NAME}:${addRoleToGroup.name} (IN) -> groupId: ${groupId}, roleId: ${roleId}`);

  const groupFound = await groupRepository.getGroupByFilter({ id: groupId });

  // Check if group found
  if (!groupFound) {
    const errorMessage = `Group with id: ${groupId} not found in database`;
    log.error(`${MODULE_NAME}:${addRoleToGroup.name} (ERROR) -> ${errorMessage}`);
    throw new Error(errorMessage);
  }

  const roleFound = await roleRepository.getRoleByFilter({ id: roleId });

  // Check if role found
  if (!roleFound) {
    const errorMessage = `Role with id: ${roleId} not found in database`;
    log.error(`${MODULE_NAME}:${addRoleToGroup.name} (ERROR) -> ${errorMessage}`);
    throw new Error(errorMessage);
  }

  const result = await groupRepository.addRoleToGroup(groupId, roleFound);

  log.debug(`${MODULE_NAME}:${addRoleToGroup.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteRoleFromGroup(groupId, roleId) {
  log.debug(`${MODULE_NAME}:${deleteRoleFromGroup.name} (IN) -> groupId: ${groupId}, roleId: ${roleId}`);

  const groupFound = await groupRepository.getGroupByFilter({ id: groupId });

  // Check if group found
  if (!groupFound) {
    const errorMessage = `Group with id: ${groupId} not found in database`;
    log.error(`${MODULE_NAME}:${addRoleToGroup.name} (ERROR) -> ${errorMessage}`);
    throw new Error(errorMessage);
  }

  const roleFound = await roleRepository.getRoleByFilter({ id: roleId });

  // Check if role found
  if (!roleFound) {
    const errorMessage = `Role with id: ${roleId} not found in database`;
    log.error(`${MODULE_NAME}:${addRoleToGroup.name} (ERROR) -> ${errorMessage}`);
    throw new Error(errorMessage);
  }

  const result = await groupRepository.deleteRoleFromGroup(groupId, roleFound);

  log.debug(`${MODULE_NAME}:${deleteRoleFromGroup.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  addRoleToGroup,
  deleteRoleFromGroup,
};
