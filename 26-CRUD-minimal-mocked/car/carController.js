// carController.js

let app;

function init(appIN) {
  app = appIN;
}

app.get('/', (req, res) => {
  res.send('Hello World Express!');
});

module.exports = {
  init,
};
