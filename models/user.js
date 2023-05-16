const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'Email already in use.'],
    required: true,
  },
  hash: String,
  salt: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
