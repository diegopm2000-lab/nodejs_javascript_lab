// authorization.controller.js

const log = require('../infrastructure/logger/applicationLogger.gateway');
const jwtInfra = require('../infrastructure/jwt.infra');
const authorizationService = require('../services/authorization.service');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Authorization Controller]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function authorize(req, res) {
  const { endpointurl, token } = req.headers;

  log.debug(`${MODULE_NAME}:${authorize.name} (IN) -> endpointurl: ${endpointurl}, token: ${token}`);

  const userInfo = jwtInfra.getUserInfoFromAuthHeader(token);

  const result = await authorizationService.authorize(endpointurl, userInfo);

  log.debug(`${MODULE_NAME}:${authorize.name} (OUT) -> result: ${JSON.stringify(result)}`);
  res.json(result);
}

module.exports = {
  authorize,
};
