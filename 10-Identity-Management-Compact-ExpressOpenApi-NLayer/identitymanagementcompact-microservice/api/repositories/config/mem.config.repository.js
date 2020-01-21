// mem.config.repository.js

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

let data;

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC FUNCTIONS
// //////////////////////////////////////////////////////////////////////////////

function get() {
  return data;
}

function set(config) {
  data = config;
}

function getLoggerConfig() {
  return data.infrastructure.logger;
}

function getExpressConfig() {
  return data.infrastructure.express;
}

function getMongoConfig() {
  return data.infrastructure.mongo;
}

function getAuthConfig() {
  return data.infrastructure.authentication;
}

module.exports = {
  get,
  set,
  getLoggerConfig,
  getExpressConfig,
  getMongoConfig,
  getAuthConfig,
};
