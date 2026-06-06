const mongoose = require('mongoose');

// STUB: connect mongoose (chưa auto-connect)
// Mục tiêu: để team biết chỗ triển khai DB layer.
async function connectMongo({ uri } = {}) {
  const mongoUri = uri || process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI');
  }

  mongoose.set('strictQuery', false);

  await mongoose.connect(mongoUri);
  return mongoose.connection;
}

module.exports = { connectMongo };

