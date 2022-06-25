# WebPush Helloworld - Http

Push notitications implemented using the npm web-push library.

Example from https://pusher.com/tutorials/push-notifications-node-service-workers

### 1. Install the dependencies

```shell
$ npm i
```

### 2. Start the server

```shell
$ node server.js
```

### 3. Test the notifications

http://localhost:5000

Press the main button to enable the notifications, and then, press again to generate a notification.

### 4. Conclussions & Drawbacks

- Works well in Firefox and Chrome
- Not working remotely using http as protocol
- Not working in safari
