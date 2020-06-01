// index.js (express tls server)

const express = require('express');
var https = require('https');

const port = process.env.PORT;
const key = process.env.KEY;
const cert = process.env.CERT;

const credentials = { key, cert };
console.log(`--> App (IN): --> params IN:\nport: ${port}, \nkey: ${key}, \ncert: ${cert}`)

const app = express();

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port);

console.log(`\n\n--> NodeJS Express listening at port: ${port}...try <<hostname>>/hellotls and enjoy!`)

app.get('/hellotls', (req, res) => {
  console.log('entering in hellotls...');
  const result = { message: 'Hello world express with https!'};
  console.log(`--> result: ${JSON.stringify(result)}`);
  res.send(result);
});

