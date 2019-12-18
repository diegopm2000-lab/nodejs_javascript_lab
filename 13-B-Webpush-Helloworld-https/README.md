# WebPush Helloworld - Https

Push notitications implemented using the npm web-push library.

Example from https://pusher.com/tutorials/push-notifications-node-service-workers

Modifications required in server.js to start express with https protocol:

```javascript
const fs = require('fs');
const https = require('https');

...
...
...

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
}, app)
.listen(5000, function () {
  console.log('Example app listening on port 5000! Go to https://localhost:5000/')
})
```

### 1. Install the dependencies

```shell
$ npm i
```

### 2. Generate the self-signed certificate

```shell
$ openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

### 3. Start the server

```shell
$ node server.js
```

### 4. Test the notifications

https://localhost:5000

Press the main button to enable the notifications, and then, press again to generate a notification.

### 5. Conclussions & Drawbacks

- Works well in Firefox
- Not working remotely using http as protocol
- Not working in Chrome --> it is neccesary a granted certificate or jump the Chrome Security of service workers. Check this link: https://deanhume.com/testing-service-workers-locally-with-self-signed-certificates/
- Not working in Safari
