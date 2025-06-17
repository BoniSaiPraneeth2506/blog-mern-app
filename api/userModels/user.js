const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,         // prevent duplicate usernames
  },
  passWord: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,        // adds createdAt and updatedAt
});

module.exports = mongoose.model('User', UserSchema);
