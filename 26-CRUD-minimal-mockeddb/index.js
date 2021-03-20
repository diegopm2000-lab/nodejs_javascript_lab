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

app.listen(3000);

// ///////////////////////////////////////////////////
// MOCKED DATABASE
// ///////////////////////////////////////////////////

const cars = [
  { id: 0, brand: 'Peugeot', car: '308' },
  { id: 1, brand: 'Renault', car: 'Megane' },
  { id: 2, brand: 'Audi', car: 'A3' },
  { id: 3, brand: 'BMW', car: 'Serie 1' },
  { id: 4, brand: 'Mercedes', car: 'A Class' },
];

// ///////////////////////////////////////////////////
// ERROR MESSAGES
// ///////////////////////////////////////////////////

const ID_MUST_BE_A_NUMBER = 'Id must be a number';
const OBJECT_NOT_FOUND = 'Object not found';
const DATA_IS_NOT_VALID = 'Data is not valid';

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
  }

  res.status(500).json({ message: 'internal error' });
}

// API

app.get('/cars/:id', (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Getting car by id: ${req.params.id}`);

    const innerId = checkValidId(id);
    checkObjectFound(id);

    res.json(cars[innerId]);
  } catch (error) {
    errorHandler(error, res);
  }
});

app.get('/cars', (req, res) => {
  console.log('Getting all cars...');
  res.json(cars);
});

app.post('/cars', (req, res) => {
  try {
    const data = JSON.parse(JSON.stringify(req.body));
    console.log(`Adding a new car: ${JSON.stringify(data)}`);

    checkData(data);

    const newCar = {
      id: cars.length,
      brand: data.brand,
      car: data.car,
    };

    cars.push(newCar);

    res.status(201).json(cars[newCar.id]);
  } catch (error) {
    errorHandler(error, res);
  }
});

app.put('/cars/:id', (req, res) => {
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

    cars[innerId] = updatedCar;

    res.json(cars[Number(id)]);
  } catch (error) {
    errorHandler(error, res);
  }
});

app.delete('/cars/:id', (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Deleting car by id: ${id}`);

    const innerId = checkValidId(id);
    checkObjectFound(id);

    cars.splice(innerId, 1);

    res.status(204).send();
  } catch (error) {
    errorHandler(error, res);
  }
});
