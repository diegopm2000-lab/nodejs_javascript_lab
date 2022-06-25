// mongo.endpoint.js

const mongoose = require('mongoose');
// const mongooseHidden = require('mongoose-hidden')();

const endpointSchema = new mongoose.Schema({
  id: String,
  microapp: String,
  name: String,
  description: String,
  method: String,
  url: String,
  urlregex: String,
});

// endpointSchema.plugin(mongooseHidden); // to hidden _id and __v in query results

const Endpoint = mongoose.model('Endpoint', endpointSchema);

module.exports = {
  Endpoint,
};
