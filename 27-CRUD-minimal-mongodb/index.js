/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const assert = require('assert');

// ///////////////////////////////////////////////////
// MONGO DATABASE
// ///////////////////////////////////////////////////

const url = 'mongodb://admin:password@localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true });
const dbName = 'carsDB';
const collectionName = 'cars';

let mongoDB;

function dataBaseConnect() {
  return new Promise((resolve, reject) => {
    try {
      client.connect((err) => {
        assert.equal(null, err);
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        console.log('Connected successfully to mongodb database');
        resolve(db);
      });
    } catch (error) {
      reject(error);
    }
  });
}

// eslint-disable-next-line no-unused-vars
function dataBaseClose() {
  client.close();
  console.log('Disconnected successfully from mongodb database');
}

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

(async () => {
  mongoDB = await dataBaseConnect();
})();

// ///////////////////////////////////////////////////
// ERROR MESSAGES
// ///////////////////////////////////////////////////

const ID_MUST_BE_A_NUMBER = 'Id must be a number';
const OBJECT_NOT_FOUND = 'Object not found';
const DATA_IS_NOT_VALID = 'Data is not valid';

// ///////////////////////////////////////////////////
// MONGODB REPOSITORY
// ///////////////////////////////////////////////////

function findAll() {
  return new Promise((resolve, reject) => {
    try {
      mongoDB.collection(collectionName)
        .find({})
        .toArray((err, data) => {
          // eslint-disable-next-line no-unused-expressions
          err ? reject(err) : resolve(data);
        });
    } catch (error) {
      reject(error);
    }
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    try {
      mongoDB.collection(collectionName)
        .find({ id })
        .limit(1)
        .toArray((err, data) => {
          // eslint-disable-next-line no-unused-expressions
          err ? reject(err) : resolve(data[0]);
        });
    } catch (error) {
      reject(error);
    }
  });
}

function insertOne(data) {
  return new Promise((resolve, reject) => {
    try {
      mongoDB.collection(collectionName)
        .insertOne(data, (err, res) => {
          // eslint-disable-next-line no-unused-expressions
          err ? reject(err) : resolve(res);
        });
    } catch (error) {
      reject(error);
    }
  });
}

function updateOne(id, data) {
  return new Promise((resolve, reject) => {
    try {
      console.log(`UpdateOne with id: ${id}, data: ${JSON.stringify(data)}`);
      mongoDB.collection(collectionName)
        .updateOne({ id }, { $set: data }, (err, res) => {
          if (err) {
            reject(err);
          }
          if (res.matchedCount === 0) {
            reject(new Error(OBJECT_NOT_FOUND));
          }
          resolve(true);
        });
    } catch (error) {
      reject(error);
    }
  });
}

function deleteOne(id) {
  return new Promise((resolve, reject) => {
    try {
      mongoDB.collection(collectionName)
        .deleteOne({ id }, (err, res) => {
          // eslint-disable-next-line no-unused-expressions
          err ? reject(err) : resolve(res);
        });
    } catch (error) {
      reject(error);
    }
  });
}

function count() {
  return new Promise((resolve, reject) => {
    try {
      mongoDB.collection(collectionName)
        .count({}, (err, res) => {
          // eslint-disable-next-line no-unused-expressions
          err ? reject(err) : resolve(res);
        });
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

function checkObjectFound(obj) {
  if (!obj) {
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
    checkData(data);

    const updatedCar = {
      id: innerId,
      brand: data.brand,
      car: data.car,
    };

    await updateOne(innerId, updatedCar);
    console.log('updated');

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
