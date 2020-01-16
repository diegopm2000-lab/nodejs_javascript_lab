// mongo.endpoint.repository.js

const log = require('../../infrastructure/logger/applicationLogger.gateway');
const mongoHelper = require('../../helpers/mongoose.helper');
const { Endpoint } = require('./mongo.endpoint'); // Endpoint Schema

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Mongo Endpoint Repository]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getEndpoints() {
  log.debug(`${MODULE_NAME}:${getEndpoints.name} (IN) -> params: no params`);

  const result = await mongoHelper.getAll(Endpoint);

  log.debug(`${MODULE_NAME}:${getEndpoints.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getEndpointByFilter(filter) {
  log.debug(`${MODULE_NAME}:${getEndpointByFilter.name} (IN) -> filter: ${JSON.stringify(filter)}`);

  const result = await mongoHelper.getByFilter(Endpoint, filter);

  log.debug(`${MODULE_NAME}:${getEndpointByFilter.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function createEndpoint(newEndpoint) {
  log.debug(`${MODULE_NAME}:${createEndpoint.name} (IN) -> newEndpoint: ${JSON.stringify(newEndpoint)}`);

  const result = await mongoHelper.create(Endpoint, newEndpoint);

  log.info(`${MODULE_NAME}:${createEndpoint.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function updateEndpoint(id, endpointData) {
  log.info(`${MODULE_NAME}:${updateEndpoint.name} (IN) -> id: ${id}, endpointData: ${JSON.stringify(endpointData)}`);

  const result = await mongoHelper.update(Endpoint, id, endpointData);

  log.info(`${MODULE_NAME}:${updateEndpoint.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteEndpoint(id) {
  log.debug(`${MODULE_NAME}:${deleteEndpoint.name} (IN) -> id: ${id}`);

  const result = await mongoHelper.deleteById(Endpoint, id);

  log.debug(`${MODULE_NAME}:${deleteEndpoint.name} (OUT) -> result: ${result}`);
  return result;
}

module.exports = {
  getEndpoints,
  getEndpointByFilter,
  createEndpoint,
  updateEndpoint,
  deleteEndpoint,
};
