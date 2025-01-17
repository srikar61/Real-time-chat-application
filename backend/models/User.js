const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountName: { type: String, required: true },
  dob: { type: Date, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
  mobile: { type: String, required: true },
});

module.exports = mongoose.model('User', userSchema);
