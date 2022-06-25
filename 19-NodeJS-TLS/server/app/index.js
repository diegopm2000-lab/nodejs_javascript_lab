// index.js (server-tls)

const tls = require('tls');
const fs = require('fs');
const colors = require('colors');

const msg = [
  ".-..-..-.  .-.   .-. .--. .---. .-.   .---. .-.",
  ": :; :: :  : :.-.: :: ,. :: .; :: :   : .  :: :",
  ":    :: :  : :: :: :: :: ::   .': :   : :: :: :",
  ": :: :: :  : `' `' ;: :; :: :.`.: :__ : :; ::_;",
  ":_;:_;:_;   `.,`.,' `.__.':_;:_;:___.':___.':_;"
].join("\n").cyan;

const port = process.env.PORT;
const key = process.env.KEY;
const cert = process.env.CERT;

const options = { 
  key, 
  cert,
  rejectUnauthorized: true,
};

const server = tls.createServer(options, (socket) => {
  console.log('server connected',
              socket.authorized ? 'authorized' : 'unauthorized');
  socket.write(`${msg}\n`);
  socket.setEncoding('utf8');
  socket.pipe(socket);
});

server.listen(port, () => {
  console.log(`---> TLS server created and listening at port : ${port}`);
});

