// index.js

const express = require('express');
const { initialize } = require('express-openapi');

const app = express();

initialize({
  app,
  apiDoc: './swagger.yaml',
  operations: {
    helloworld(req, res) {
      res.send('Hello World Open Api Express');
    },
  },
});

app.listen(3000);
