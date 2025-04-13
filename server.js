const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const server = http.createServer(app);

// Socket.io initialization
const io = socketIo(server);

// Middlewares
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define routes
const userRoutes = require('./routes/userRoutes');
const rideRoutes = require('./routes/rideRoutes');
app.use('/users', userRoutes);
app.use('/rides', rideRoutes);

// Socket.io handling
io.on('connection', (socket) => {
  console.log('A user connected');
  // Handling ride booking notification
  socket.on('book-ride', (rideData) => {
    io.emit('new-ride', rideData); // Notify available drivers
  });

  socket.on('accept-ride', (rideId) => {
    io.emit('ride-accepted', rideId); // Notify user that ride is accepted
  });

  socket.on('driver-location', (locationData) => {
    io.emit('update-location', locationData); // Update ride location for user
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
