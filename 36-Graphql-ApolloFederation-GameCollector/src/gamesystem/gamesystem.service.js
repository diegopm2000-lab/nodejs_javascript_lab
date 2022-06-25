// gamesystem.service.js

/* eslint-disable no-console */

const uniqid = require('uniqid');

const gameSystemRepository = require('./gamesystem.repository');

function getById(id) {
  console.log(`--> getById, id: ${id}`);
  return gameSystemRepository.getById(id);
}

function getAll() {
  return gameSystemRepository.getAll();
}

function add(newDataIN) {
  const newData = JSON.parse(JSON.stringify(newDataIN));
  // Generate unique Id
  const id = `gs-${uniqid()}`;
  newData.id = id;

  return gameSystemRepository.add(newData);
}

function update(updatedData) {
  gameSystemRepository.update(updatedData);

  return getById(updatedData.id);
}

function remove(id) {
  return gameSystemRepository.remove(id);
}

module.exports = {
  getById,
  getAll,
  add,
  update,
  remove,
};
