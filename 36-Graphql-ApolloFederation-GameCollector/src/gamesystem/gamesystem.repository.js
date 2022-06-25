// gamesystem.repository.js

/* eslint-disable no-console */

const data = [
  { id: 'gs-1', name: 'Commodore Amiga', description: 'A 16 bit Commodore computer' },
  { id: 'gs-2', name: 'Sinclair ZX Spectrum', description: 'A 8 bit Sinclair computer' },
  { id: 'gs-3', name: 'Nintendo NES', description: 'A 8 bit Nintendo Console' },
  { id: 'gs-4', name: 'Sega Megadrive', description: 'A 16 bit Sega Console' },
];

function getById(id) {
  return data.find((e) => e.id === id);
}

function getAll() {
  return data;
}

function add(newData) {
  data.push(newData);
  return newData;
}

function update(updatedData) {
  console.log(`--> updatedData: ${JSON.stringify(updatedData)}`);
  const indexFound = data.findIndex((e) => e.id === updatedData.id);
  console.log(`--> indexFound: ${indexFound}`);

  if (indexFound === -1) {
    console.log('Not found');
    return false;
  }

  data[indexFound] = updatedData;
  return true;
}

function remove(id) {
  const indexFound = data.findIndex((e) => e.id === id);

  if (indexFound === -1) {
    console.log('Not found');
    return false;
  }

  data.splice(indexFound, 1);
  return true;
}

module.exports = {
  getById,
  getAll,
  add,
  update,
  remove,
};
