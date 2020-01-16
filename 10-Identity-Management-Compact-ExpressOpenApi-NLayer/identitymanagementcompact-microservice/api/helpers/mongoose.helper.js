// mongo.helper.js

const log = require('../infrastructure/logger/applicationLogger.gateway');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS & PROPERTIES
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Mongoose Helper]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

async function getAll(Schema) {
  log.debug(`${MODULE_NAME}:${getAll.name} (IN) -> Schema: ${Schema.prototype.baseModelName}`);

  // TODO no se hacen igual el find y el findOne ???? uno con exec y el otro no??? WTF

  const query = Schema.find({});
  const result = await query.exec();

  log.debug(`${MODULE_NAME}:${getAll.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function getByFilter(Schema, filter) {
  log.debug(`${MODULE_NAME}:${getByFilter.name} (IN) -> Schema: ${Schema.prototype.baseModelName}, filter: ${JSON.stringify(filter)}`);

  const result = await Schema.findOne(filter);

  log.debug(`${MODULE_NAME}:${getByFilter.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function create(Schema, newData) {
  log.debug(`${MODULE_NAME}:${create.name} (IN) -> Schema: ${Schema.prototype.baseModelName}, newData: ${JSON.stringify(newData)}`);

  const result = await Schema.create(newData);

  log.info(`${MODULE_NAME}:${create.name} (OUT) -> result: ${JSON.stringify(newData)}`);
  return result;
}

async function update(Schema, id, data) {
  log.info(`${MODULE_NAME}:${update.name} (IN) -> Schema: ${Schema.prototype.baseModelName}, id: ${id}, data: ${JSON.stringify(data)}`);

  const result = await Schema.findOneAndUpdate(
    { id },
    { $set: data },
    { new: true },
  );

  log.info(`${MODULE_NAME}:${update.name} (OUT) -> result: ${JSON.stringify(result)}`);
  return result;
}

async function deleteById(Schema, id) {
  log.debug(`${MODULE_NAME}:${deleteById.name} (IN) -> id: ${id}`);

  const innerResult = await Schema.deleteOne({ id });
  log.debug(`${MODULE_NAME}:${deleteById.name} (MID) -> innerResult: ${JSON.stringify(innerResult)}`);

  let result = false;
  if (innerResult.ok === 1 && innerResult.deletedCount === 1) {
    result = true;
  }

  log.debug(`${MODULE_NAME}:${deleteById.name} (OUT) -> result: ${result}`);
  return result;
}

module.exports = {
  getAll,
  getByFilter,
  create,
  update,
  deleteById,
};
