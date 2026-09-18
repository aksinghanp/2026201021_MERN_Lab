const mongoose = require('mongoose');

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/notes_db';

function connectDB() {
  return mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((error) => {
      console.error(`MongoDB connection failed: ${error.message}`);
      throw error;
    });
}

module.exports = connectDB;
