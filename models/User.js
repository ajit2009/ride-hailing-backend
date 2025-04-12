const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  location: {
    lat: Number,
    lng: Number,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
