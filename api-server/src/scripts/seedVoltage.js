require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const seedVoltageData = require('../utilities/seed');

// script to reset data to the past 24 hours starting from now
async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  const count = await seedVoltageData();
  console.log(`Inserted ${count} records`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
