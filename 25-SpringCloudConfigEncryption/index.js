// index.js

const axios = require('axios');

async function loadConfig(endpoint) {
  try {
    const response = await axios.get(endpoint);
    console.log(`--> config loaded: ${JSON.stringify(response.data)}`)
  } catch (error) {
    console.error(`--> error.message: ${error.message}`);
    console.error(`--> error.stack: ${error.stack}`);
  }
  
}

loadConfig('http://localhost:8888/springcfgencryptedtest-dev.json');
