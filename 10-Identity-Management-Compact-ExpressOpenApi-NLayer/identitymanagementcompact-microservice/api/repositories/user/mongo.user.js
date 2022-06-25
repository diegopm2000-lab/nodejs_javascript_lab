// mongo.user.js

const mongoose = require('mongoose');
// const mongooseHidden = require('mongoose-hidden')();

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  enabled: Boolean,
  initDate: Date,
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
});

// userSchema.plugin(mongooseHidden); // to hidden _id and __v in query results

// eslint-disable-next-line func-names
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
