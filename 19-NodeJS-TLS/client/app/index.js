// index.js (client)

const tls = require('tls');
const fs = require('fs');

const hostname = process.env.HOSTNAME;
const ca = process.env.CERT;
const port = process.env.PORT;

console.log(`--> hostname: ${hostname}, port: ${port}`);

const options = {
  ca,
};

var socket = tls.connect(port, hostname, options, () => {
  console.log('client connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  process.stdin.pipe(socket);
  process.stdin.resume();
});

socket.setEncoding('utf8');
socket.on('data', (data) => {
  console.log(data);
});

socket.on('end', () => {
  console.log('Ended')
});