// index.js

const express = require('express');

const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/helloworld', (req, res) => {
  res.send('Hello World Swagger-UI - Try to http://localhost:3000/api-docs to view the API DOCUMENTATION using Swagger-UI!');
});

app.listen(3000);
