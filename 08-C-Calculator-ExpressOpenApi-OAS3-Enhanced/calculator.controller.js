// calculator.controller.js

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Calculator Controller]';

const log = require('./logger');

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

function add(req, res) {
  const { a, b } = req.query;
  log.debug(`${MODULE_NAME}:add (IN) --> a: ${a}, b: ${b}`);

  const result = a + b;

  log.debug(`${MODULE_NAME}:add (OUT) --> result: ${result}`);
  res.send({ result });
}

function substract(req, res) {
  const { a, b } = req.query;
  log.debug(`${MODULE_NAME}:substract (IN) --> a: ${a}, b: ${b}`);

  const result = a - b;

  log.debug(`${MODULE_NAME}:substract (OUT) --> result: ${result}`);
  res.send({ result });
}

function multiply(req, res) {
  const { a, b } = req.query;
  log.debug(`${MODULE_NAME}:multiply (IN) --> a: ${a}, b: ${b}`);

  const result = a * b;

  log.debug(`${MODULE_NAME}:multiply (OUT) --> result: ${result}`);
  res.send({ result });
}

function divide(req, res) {
  const { a, b } = req.query;
  log.debug(`${MODULE_NAME}:division (IN) --> a: ${a}, b: ${b}`);

  // Check division by zero
  if (b === 0) {
    log.error(`${MODULE_NAME}:division (ERROR) --> Division by zero not allowed!`);
    const newError = { status: 400, message: 'Division by zero not allowed' };
    throw newError;
  // Another case
  } else {
    const result = a / b;
    log.debug(`${MODULE_NAME}:division (OUT) --> result: ${result}`);
    res.send({ result });
  }
}

module.exports = {
  add,
  substract,
  multiply,
  divide,
};
