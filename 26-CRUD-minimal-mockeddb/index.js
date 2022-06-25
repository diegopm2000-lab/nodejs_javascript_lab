/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');

// ///////////////////////////////////////////////////
// BOOTSTRAP
// ///////////////////////////////////////////////////

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.listen(3000, () => {
  console.log('Express started at port: 3000');
});

// ///////////////////////////////////////////////////
// ERROR MESSAGES
// ///////////////////////////////////////////////////

const ID_MUST_BE_A_NUMBER = 'Id must be a number';
const OBJECT_NOT_FOUND = 'Object not found';
const DATA_IS_NOT_VALID = 'Data is not valid';

// ///////////////////////////////////////////////////
// MOCKEDDB REPOSITORY
// ///////////////////////////////////////////////////

const cars = [
  { id: 0, brand: 'Opel', car: 'Astra' },
  { id: 1, brand: 'Renault', car: 'Megane' },
  { id: 2, brand: 'Ford', car: 'Focus' },
  { id: 3, brand: 'Audi', car: 'A3' },
  { id: 4, brand: 'Mercedes', car: 'A Class' },
];

function findAll() {
  return new Promise((resolve, reject) => {
    try {
      resolve(cars);
    } catch (error) {
      reject(error);
    }
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(cars.find((element) => element.id === id));
    } catch (error) {
      reject(error);
    }
  });
}

function insertOne(data) {
  return new Promise((resolve, reject) => {
    try {
      cars.push(data);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

function updateOne(id, data) {
  return new Promise((resolve, reject) => {
    try {
      console.log(`UpdateOne with id: ${id}, data: ${JSON.stringify(data)}`);

      const index = cars.findIndex((element) => element.id === id);
      if (index === -1) {
        reject(OBJECT_NOT_FOUND);
      }
      cars[index] = data;

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

function deleteOne(id) {
  return new Promise((resolve, reject) => {
    try {
      const index = cars.findIndex((element) => element.id === id);
      if (index === -1) {
        reject(OBJECT_NOT_FOUND);
      }
      cars.splice(index, 1);

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

function count() {
  return new Promise((resolve, reject) => {
    try {
      resolve(cars.length);
    } catch (error) {
      reject(error);
    }
  });
}

// ///////////////////////////////////////////////////
// UTILITY FUNCTIONS
// ///////////////////////////////////////////////////

function checkValidId(id) {
  if (Number.isNaN(Number(id))) {
    throw new Error(ID_MUST_BE_A_NUMBER);
  }

  return Number(id);
}

function checkObjectFound(id) {
  if (!cars[id]) {
    throw new Error(OBJECT_NOT_FOUND);
  }

  return true;
}

function checkData(data) {
  if (!data.brand || !data.car) {
    throw new Error(DATA_IS_NOT_VALID);
  }
}

function errorHandler(error, res) {
  if (error.message === ID_MUST_BE_A_NUMBER) {
    res.status(400).json({ message: ID_MUST_BE_A_NUMBER });
  } else if (error.message === OBJECT_NOT_FOUND) {
    res.status(404).json({ message: OBJECT_NOT_FOUND });
  } else if (error.message === DATA_IS_NOT_VALID) {
    res.status(400).json({ message: DATA_IS_NOT_VALID });
  } else {
    res.status(500).json({ message: 'internal error' });
  }
}

// API

app.get('/cars', async (req, res) => {
  try {
    console.log('Getting all cars...');

    const result = await findAll();

    res.json(result);
  } catch (error) {
    console.error(error.stack);
    errorHandler(error, res);
  }
});

app.get('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Getting car by id: ${req.params.id}`);

    const innerId = checkValidId(id);

    const result = await findById(innerId);

    checkObjectFound(result);

    res.json(result);
  } catch (error) {
    console.error(error.stack);
    errorHandler(error, res);
  }
});

app.post('/cars', async (req, res) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body));
    console.log(`Adding a new car: ${JSON.stringify(data)}`);

    checkData(data);

    const numberOfCars = await count();

    const newCar = {
      id: numberOfCars,
      brand: data.brand,
      car: data.car,
    };

    await insertOne(newCar);

    const result = await findById(newCar.id);

    res.status(201).json(result);
  } catch (error) {
    console.error(error.stack);
    errorHandler(error, res);
  }
});

app.put('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(`Updating a car with id: ${id} and data: ${JSON.stringify(data)}`);

    const innerId = checkValidId(id);
    checkObjectFound(id);
    checkData(data);

    const updatedCar = {
      id: innerId,
      brand: data.brand,
      car: data.car,
    };

    await updateOne(innerId, updatedCar);

    const result = await findById(updatedCar.id);

    res.json(result);
  } catch (error) {
    console.error(error.stack);
    errorHandler(error, res);
  }
});

app.delete('/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting car by id: ${id}`);

    const innerId = checkValidId(id);

    await deleteOne(innerId);

    res.status(204).send();
  } catch (error) {
    console.error(error.stack);
    errorHandler(error, res);
  }
});
