// mongo.group.js

const mongoose = require('mongoose');
// const mongooseHidden = require('mongoose-hidden')();

const groupSchema = new mongoose.Schema({
  id: String,
  name: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
  ],
});

// groupSchema.plugin(mongooseHidden); // to hidden _id and __v in query results

const Group = mongoose.model('Group', groupSchema);

module.exports = {
  Group,
};
