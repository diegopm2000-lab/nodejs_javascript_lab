// main.controller.js

function hello(req, res) {
  res.json({ result: 'SwaggerExpressMiddleware Helloworld - Open API 2.0' });
}

module.exports = {
  hello,
};
