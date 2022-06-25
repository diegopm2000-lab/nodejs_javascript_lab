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

async function addRoleToGroup(id, role) {
  log.debug(`${MODULE_NAME}:${addRoleToGroup.name} (IN) -> id: ${id}, role: ${JSON.stringify(role)}`);

  const result = await Group.findOneAndUpdate(
    { id },
    { $addToSet: { roles: role._id } }, // eslint-disable-line no-underscore-dangle
    { new: true },
  );

  log.debug(`${MODULE_NAME}:${addRoleToGroup.name} (OUT) -> result: ${result}`);
  return result;
}

async function deleteRoleFromGroup(id, role) {
  log.debug(`${MODULE_NAME}:${deleteRoleFromGroup.name} (IN) -> id: ${id}, role: ${JSON.stringify(role)}`);

  const result = await Group.findOneAndUpdate(
    { id },
    { $pull: { roles: role._id } }, // eslint-disable-line no-underscore-dangle
    { new: true },
  );

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
