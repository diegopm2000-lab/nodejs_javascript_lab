// endpoint.controller.js

const log = require('../infrastructure/logger/applicationLogger.gateway');
const endpointService = require('../services/endpoint.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Endpoint Controller]';

// //////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
// //////////////////////////////////////////////////////////////////////////////

function buildEndpointParams(objIN) {
  const result = {
    name: objIN.name,
    description: objIN.description,
    method: objIN.method,
    url: objIN.url,
    urlregex: objIN.urlregex,
  };
  return result;
}

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getEndpoints(req, res) {
  log.debug(`${MODULE_NAME}:${getEndpoints.name} (IN) -> no params`);

  const result = await endpointService.getEndpoints();

  log.debug(`${MODULE_NAME}:${getEndpoints.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function getEndpointById(req, res) {
  const { endpointId } = req.params;
  log.debug(`${MODULE_NAME}:${getEndpoints.name} (IN) -> endpointId: ${endpointId}`);

  const result = await endpointService.getEndpointById(endpointId);

  log.debug(`${MODULE_NAME}:${getEndpoints.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function createEndpoint(req, res) {
  const { body } = req;
  log.debug(`${MODULE_NAME}:${createEndpoint.name} (IN) -> body: ${JSON.stringify(body)}`);

  const newEndpointParams = buildEndpointParams(body);

  const result = await endpointService.createEndpoint(newEndpointParams);

  log.debug(`${MODULE_NAME}:${createEndpoint.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function updateEndpoint(req, res) {
  const { body } = req;
  const { endpointId } = req.params;

  log.debug(`${MODULE_NAME}:${updateEndpoint.name} (IN) -> endpointId: ${endpointId}, body: ${JSON.stringify(body)}`);

  const endpointParams = buildEndpointParams(body);

  const result = await endpointService.updateEndpoint(endpointId, endpointParams);

  log.debug(`${MODULE_NAME}:${updateEndpoint.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

async function deleteEndpoint(req, res) {
  const { endpointId } = req.params;
  log.debug(`${MODULE_NAME}:${getEndpoints.name} (IN) -> endpointId: ${endpointId}`);

  const result = await endpointService.deleteEndpoint(endpointId);

  log.debug(`${MODULE_NAME}:${updateEndpoint.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json({ result });
}

module.exports = {
  getEndpoints,
  getEndpointById,
  createEndpoint,
  updateEndpoint,
  deleteEndpoint,
};
