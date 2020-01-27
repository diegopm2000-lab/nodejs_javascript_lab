// authorization.service.js

const log = require('../infrastructure/logger/applicationLogger.gateway');
const userRepository = require('../repositories/user/mongo.user.repository');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Authorization Service]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function authorize(endpointurl, username) {
  log.debug(`${MODULE_NAME}:${authorize.name} (IN) -> endpointurl: ${endpointurl}, username: ${JSON.stringify(username)}`);

  // Get the complete userInfo
  const user = await userRepository.getUserByFilter({ username }, true);

  log.debug(`${MODULE_NAME}:${authorize.name} (MID) -> user: ${JSON.stringify(user)}`);

  const userEndpoints = [];

  // TODO complejidad O(2N) --> mejorable, se puede hacer en un O(n) con una única pasada por el array y además cortar
  // la búsqueda en cuanto se haya encontrado

  user.groups.forEach((group) => {
    group.roles.forEach((role) => {
      role.endpoints.forEach((endpoint) => {
        userEndpoints.push(endpoint);
      });
    });
  });

  log.debug(`${MODULE_NAME}:${authorize.name} (MID) -> userEndpoints: ${JSON.stringify(userEndpoints)}`);

  const endpointFound = userEndpoints.find((endpoint) => {
    // TODO usar la librería de regex mejor que ponerlo a manubrio en el mongo
    const pattern = new RegExp(endpoint.urlregex);
    const result = pattern.test(endpointurl);
    console.log(`${MODULE_NAME}:${authorize.name} (MID) -> urlregex: ${endpoint.urlregex}, endpointurl: ${endpointurl}, result match: ${result}`);
    return result;
  });

  let result;
  if (endpointFound) {
    result = { message: 'OK' };
  } else {
    result = { message: 'NOT ALLOWED' };
  }

  log.debug(`${MODULE_NAME}:${authorize.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

module.exports = {
  authorize,
};
