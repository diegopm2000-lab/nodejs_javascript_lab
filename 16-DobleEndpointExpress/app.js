// app.js

const SwaggerExpress = require('swagger-express-mw');
const express = require('express')();

const https = require('https');

const fs = require('fs');

const privateKey = fs.readFileSync('host.key');
console.log(`--> privateKey: ${privateKey}`);
const certificate = fs.readFileSync('host.cert');
console.log(`--> certificate: ${certificate}`);

module.exports = express; // for testing

const config = {
  appRoot: __dirname, // required config
};

const options = {
  key: privateKey,
  cert: certificate,
};

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(express);

  const port = process.env.PORT || 8443;
  https.createServer(options, express).listen(port, () => {
    console.log('Server started @ %s!', port);
  });

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log(`try this:\ncurl https://127.0.0.1:${port}/hello?name=Scott`);
  }
});

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(express);

  const port = process.env.PORT || 8080;
  express.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log(`try this:\ncurl http://127.0.0.1:${port}/hello?name=Scott`);
  }
});
