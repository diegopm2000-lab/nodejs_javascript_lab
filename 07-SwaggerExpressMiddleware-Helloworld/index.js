// index.js

const createMiddleware = require('swagger-express-middleware');
const path = require('path');
const express = require('express');

const app = express();

let swaggerFile = path.join(__dirname, 'swagger.yaml');
createMiddleware(swaggerFile, app, function(err, middleware) {
  // Add all the Swagger Express Middleware, or just the ones you need.
  // NOTE: Some of these accept optional options (omitted here for brevity)
  app.use(
      middleware.metadata(),
      middleware.CORS(),
      middleware.files(),
      middleware.parseRequest(),
      middleware.validateRequest(),
      // middleware.mock()
  );

  app.listen(8080, function() {
      console.log('Swagger-Express-Middleware Helloworld is now running at http://localhost:8000');
  });
});
