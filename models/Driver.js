const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: String,
  vehicle: String,
  location: {
    lat: Number,
    lng: Number,
  },
  status: { type: String, default: 'available' },
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
