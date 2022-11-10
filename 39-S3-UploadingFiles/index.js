const AWS = require('aws-sdk');
const axios = require('axios');
const fs = require('fs');

require('dotenv').config();

// /////////////////////////////////////////////////////////////////
// PRIVATE METHODS
// /////////////////////////////////////////////////////////////////

function loadConfig() {
  return {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region,
    bucket: process.env.bucket,
    expiresSecs: process.env.expiresSecs,
    maxuploadBytes: process.env.maxuploadBytes,
    // File to upload
    localPath: process.env.localPath,
    contentType: process.env.contentType,
    key: process.env.key
  }
}

function initS3Infra(config) {
  return new AWS.S3({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: config.region
  })
}

async function getSignedUrl(s3Infra, config) {
  return new Promise((resolve) => {
    s3Infra.getSignedUrl('putObject', {
      Bucket: config.bucket,
      ContentType: config.contentType,
      Key: config.key
    }, (err, url) => {
      if (err) {
        console.error(`--> error.stack: ${err.stack}`)
        console.error(`--> error.message: ${err.message}`)
      }
      console.log(`---> url: ${url}`)
      resolve(url)
    })
  })
}

async function uploadFile(config, signedUrl) {

  const payload = fs.readFileSync(config.localPath);
  console.log(`--> payload.length: ${payload.length}`)

  await axios.put(signedUrl, payload, {
    headers: {
      'Content-Type': config.contentType
    }
  })
}

// /////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// /////////////////////////////////////////////////////////////////

async function init() {
  const config = loadConfig()
  console.log(`--> config: ${JSON.stringify(config)}`)
  const s3Infra = initS3Infra(config)
  console.log('--> S3 infra initialized')
  const url = await getSignedUrl(s3Infra, config)
  console.log('--> url signed obtained')
  uploadFile(config, url)
  console.log('--> file uploaded')
}

module.exports = {
  init,
};

// This require must be located at the end of the file
require('make-runnable');
