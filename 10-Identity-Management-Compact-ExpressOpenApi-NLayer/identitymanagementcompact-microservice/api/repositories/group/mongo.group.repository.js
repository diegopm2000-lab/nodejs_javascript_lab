// mongo.group.repository.js

const log = require('../../infrastructure/logger/applicationLogger.gateway');
const mongoHelper = require('../../helpers/mongoose.helper');
const { Group } = require('./mongo.group'); // Group Schema

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Mongo Group Repository]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getGroups() {
  log.debug(`${MODULE_NAME}:${getGroups.name} (IN) -> params: no params`);

  const result = await mongoHelper.getAll(Group);

  log.debug(`${MODULE_NAME}:${getGroups.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getGroupByFilter(filter) {
  log.debug(`${MODULE_NAME}:${getGroupByFilter.name} (IN) -> filter: ${JSON.stringify(filter)}`);

  const result = await mongoHelper.getByFilter(Group, filter);

  log.debug(`${MODULE_NAME}:${getGroupByFilter.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createGroup(newGroup) {
  log.debug(`${MODULE_NAME}:${createGroup.name} (IN) -> newGroup: ${JSON.stringify(newGroup)}`);

  const result = await mongoHelper.create(Group, newGroup);

  log.info(`${MODULE_NAME}:${createGroup.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function updateGroup(id, groupData) {
  log.info(`${MODULE_NAME}:${updateGroup.name} (IN) -> id: ${id}, groupData: ${JSON.stringify(groupData)}`);

  const result = await mongoHelper.update(Group, id, groupData);

  log.info(`${MODULE_NAME}:${updateGroup.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteGroup(id) {
  log.debug(`${MODULE_NAME}:${deleteGroup.name} (IN) -> id: ${id}`);

  const result = await mongoHelper.deleteById(Group, id);

  log.debug(`${MODULE_NAME}:${deleteGroup.name} (OUT) -> result: ${result}`);
  return result;
}

async function addRoleToGroup(groupId, roleId) {
  log.debug(`${MODULE_NAME}:${addRoleToGroup.name} (IN) -> groupId: ${groupId}, roleId: ${roleId}`);

  const groupFound = await getGroupByFilter({ id: groupId });

  // Check if group found
  // TODO

  // Check if roleId found
  // TODO

  let result = groupFound;

  // Check if roles contains the roleId
  const roleIdFound = groupFound.roles.find(x => x === roleId);
  if (!roleIdFound) {
    groupFound.roles.push(roleId);
    result = await mongoHelper.update(Group, groupId, groupFound);
  }

  log.debug(`${MODULE_NAME}:${addRoleToGroup.name} (OUT) -> result: ${result}`);
  return result;
}

async function deleteRoleFromGroup(groupId, roleId) {
  log.debug(`${MODULE_NAME}:${deleteRoleFromGroup.name} (IN) -> groupId: ${groupId}, roleId: ${roleId}`);

  const groupFound = await getGroupByFilter({ id: groupId });

  // Check if group found
  // TODO

  // Check if roleId found
  // TODO

  let result = groupFound;

  // Check if roles contains the roleId
  const roleIdFound = groupFound.roles.find(x => x === roleId);
  if (roleIdFound) {
    groupFound.roles = groupFound.roles.filter(e => e !== roleId);
    result = await mongoHelper.update(Group, groupId, groupFound);
  }

  log.debug(`${MODULE_NAME}:${deleteRoleFromGroup.name} (OUT) -> result: ${result}`);
  return result;
}

module.exports = {
  getGroups,
  getGroupByFilter,
  createGroup,
  updateGroup,
  deleteGroup,
  addRoleToGroup,
  deleteRoleFromGroup,
};
