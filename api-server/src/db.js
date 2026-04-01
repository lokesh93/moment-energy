const mongoose = require('mongoose');

// connect to mongoDB with URI from .env file using mongoose driver
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not defined in environment variables');

  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas');
}

module.exports = connectDB;
