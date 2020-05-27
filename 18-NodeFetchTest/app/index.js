// index.js

const fetch = require('node-fetch');


console.log('App (IN) --> Init\n')

const endpoint = process.env.ENDPOINT;
console.log(`App (MID) --> endpoint: ${endpoint}`);

fetch(endpoint)
  .then((result) => {
    console.log(`App (MID) --> result: ${result}`);
    console.log(`App (MID) --> result (object stringified): ${JSON.stringify(result)}`);
    return true;
  })
  .catch((error) => {
    console.log(`App (ERROR) --> error.message: ${error.message}`);
    console.error(error.stack);
    return false;
  })
  .finally(() => {
    console.log('\nApp (OUT) --> End');
  });
