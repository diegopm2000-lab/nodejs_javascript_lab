// index.js (client)

const fetch = require('node-fetch');
const https = require('https');

console.log('App (IN) --> Init\n');

const endpoint = process.env.ENDPOINT;
const cert = process.env.CERT;
console.log(`App (MID) --> endpoint: ${endpoint}`);

const agent = new https.Agent({
  // rejectUnauthorized: false // TRY this if you dont have the public certificate
  ca: cert , // TRY this if you have the public certificate! --> BETTER option for production environment
})

fetch(endpoint, { agent, method: 'GET' })
  .then((result) => {
    console.log(`App (MID) --> result connection: ${JSON.stringify(result)}`);
    return result.json();
  })
  .then((jsonresponse) => {
    console.log(`App (MID) --> jsonresponse: ${JSON.stringify(jsonresponse)}`);
  })
  .catch((error) => {
    console.log(`App (ERROR) --> error.message: ${error.message}`);
    console.error(error.stack);
    return false;
  })
  .finally(() => {
    console.log('\nApp (OUT) --> End');
  });
