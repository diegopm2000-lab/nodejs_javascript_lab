// index.js (express tls server)

const express = require('express');
var https = require('https');

const port = process.env.PORT;
const key = process.env.KEY; // server private key
const cert = process.env.CERT; // server certificate
const ca = process.env.CA; // In certificates not self signed, we need to add the ca (ca certificate)
const crl = process.env.CRL; // Certificate Revocation List

const options = { 
  key, 
  cert, 
  ca,
  crl,
  requestCert: true,
  rejectUnauthorized: true 
};
console.log(`--> App (IN): --> params IN:\nport: ${port}, \nkey: ${key}, \ncert: ${cert}, \nca: ${ca}, requestCert: true, rejectUnauthorized: true`);

const app = express();

var httpsServer = https.createServer(options, app);

httpsServer.listen(port);

console.log(`\n\n--> NodeJS Express listening at port: ${port}...try <<hostname>>/hellotls and enjoy!`)

app.get('/hellotls', (req, res) => {
  console.log('entering in hellotls...');
  const result = { message: 'Hello world express with https!'};
  console.log(`--> result: ${JSON.stringify(result)}`);
  res.send(result);
});

