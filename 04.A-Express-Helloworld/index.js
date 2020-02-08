// index.js

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World Express!');
});

app.listen(3000);
