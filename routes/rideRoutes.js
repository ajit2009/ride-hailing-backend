const express = require('express');
const Ride = require('../models/Ride');
const router = express.Router();

// Book a ride
router.post('/book-ride', async (req, res) => {
  try {
    const { userId, origin, destination } = req.body;
    const newRide = new Ride({
      userId,
      origin,
      destination,
      status: 'pending',
    });
    await newRide.save();
    res.status(200).json(newRide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept a ride
router.post('/accept-ride', async (req, res) => {
  const { rideId, driverId } = req.body;
  try {
    const ride = await Ride.findById(rideId);
    ride.driverId = driverId;
    ride.status = 'accepted';
    await ride.save();
    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
