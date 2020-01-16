// endpoint.service.js

const uniqid = require('uniqid');

const log = require('../infrastructure/logger/applicationLogger.gateway');
const endpointRepository = require('../repositories/endpoint/mongo.endpoint.repository');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Endpoint Service]';

const ERROR_GROUP_EXISTS_WITH_SAME_NAME = 'Endpoint exists with the same name';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getEndpoints() {
  log.debug(`${MODULE_NAME}:${getEndpoints.name} (IN) -> no params`);

  const result = await endpointRepository.getEndpoints();

  log.debug(`${MODULE_NAME}:${getEndpoints.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getEndpointById(endpointId) {
  log.debug(`${MODULE_NAME}:${getEndpointById.name} (IN) -> endpointId: ${endpointId}`);

  const result = await endpointRepository.getEndpointByFilter({ id: endpointId });

  log.debug(`${MODULE_NAME}:${getEndpointById.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createEndpoint(newEndpointIN) {
  log.info(`${MODULE_NAME}:${createEndpoint.name} (IN) -> newEndpointIN: ${JSON.stringify(newEndpointIN)}`);

  // Check if there NOT exists a endpoint with the same name
  const endpointFound = await endpointRepository.getEndpointByFilter({ name: newEndpointIN.name });
  log.info(`${MODULE_NAME}:${createEndpoint.name} (MID) -> endpointFound: ${JSON.stringify(endpointFound)}`);
  if (endpointFound) {
    log.error(`${MODULE_NAME}:${createEndpoint.name} (ERROR) -> error: ${ERROR_GROUP_EXISTS_WITH_SAME_NAME}`);
    throw new Error(ERROR_GROUP_EXISTS_WITH_SAME_NAME);
  }

  const newEndpoint = JSON.parse(JSON.stringify(newEndpointIN));

  // Generate unique Id
  newEndpoint.id = `endpoint-${uniqid()}`;

  const result = await endpointRepository.createEndpoint(newEndpoint);

  log.debug(`${MODULE_NAME}:${createEndpoint.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function updateEndpoint(endpointId, updateEndpointDataIN) {
  log.info(`${MODULE_NAME}:${updateEndpoint.name} (IN) -> endpointId: ${endpointId}, updateEndpointDataIN: ${JSON.stringify(updateEndpointDataIN)}`);

  // Check if there NOT exists an endpoint with the same name and distinct endpointId
  const endpointFound = await endpointRepository.getEndpointByFilter({ name: updateEndpointDataIN.name, id: { $ne: endpointId } });
  log.info(`${MODULE_NAME}:${createEndpoint.name} (MID) -> endpointFound: ${JSON.stringify(endpointFound)}`);
  if (endpointFound) {
    log.error(`${MODULE_NAME}:${createEndpoint.name} (ERROR) -> error: ${ERROR_GROUP_EXISTS_WITH_SAME_NAME}`);
    throw new Error(ERROR_GROUP_EXISTS_WITH_SAME_NAME);
  }

  // Execute update
  const result = await endpointRepository.updateEndpoint(endpointId, updateEndpointDataIN);

  log.debug(`${MODULE_NAME}:${updateEndpoint.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteEndpoint(endpointId) {
  log.info(`${MODULE_NAME}:${deleteEndpoint.name} (IN) -> endpointId: ${endpointId}`);

  const result = await endpointRepository.deleteEndpoint(endpointId);

  log.debug(`${MODULE_NAME}:${deleteEndpoint.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  getEndpoints,
  getEndpointById,
  createEndpoint,
  updateEndpoint,
  deleteEndpoint,
};
