// server.js
require('dotenv').config({ path: 'variables.env' });

const fs = require('fs');
const https = require('https');

const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

app.post('/subscribe', (req, res) => {
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({
    title: 'Push notifications with Service Workers',
  });

  webPush.sendNotification(subscription, payload)
    .catch(error => console.error(error));
});

app.set('port', process.env.PORT || 5000);

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}, app)
  .listen(5000, () => {
    console.log('Example app listening on port 5000! Go to https://localhost:5000/');
  });
