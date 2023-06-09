const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
    enum: ['admin', 'manager', 'employee'],
    default: 'employee',
  },
});

module.exports = mongoose.model('User', userSchema);
