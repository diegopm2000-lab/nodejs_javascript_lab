// index.js (express tls server)

const express = require('express');
const https = require('https');
const fs = require('fs');

const port = process.env.PORT;
const key = process.env.KEY; // server private key
const cert = process.env.CERT; // server certificate
const ca = process.env.CA; // In certificates not self signed, we need to add the ca (ca certificate)

// Loading manually multiple ca in a options.ca
// const trustedCa = [
//   '/etc/ssl/certs/ca-cert-DIEGO.pem',
// ];

// https.globalAgent.options.ca = [];
// for (const ca of trustedCa) {
//   https.globalAgent.options.ca.push(fs.readFileSync(ca));
// }

// https.globalAgent.options.key = key;
// https.globalAgent.options.cert = cert;

const options = { 
  key, 
  cert, 
  // ca, 
  requestCert: true,
  rejectUnauthorized: true 
};

console.log(`--> App (IN): --> params IN:\nport: ${port}, \nkey: ${key}, \ncert: ${cert}, \nca: ${ca}, requestCert: true, rejectUnauthorized: true`);

const app = express();

// var httpsServer = https.createServer(https.globalAgent.options, app);
var httpsServer = https.createServer(options, app);

httpsServer.listen(port);

console.log(`\n\n--> NodeJS Express listening at port: ${port}...try <<hostname>>/hellotls and enjoy!`)

app.get('/hellotls', (req, res) => {
  console.log('entering in hellotls...');
  const result = { message: 'Hello world express with https!'};
  console.log(`--> result: ${JSON.stringify(result)}`);
  res.send(result);
});

