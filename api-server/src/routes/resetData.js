const express = require('express');
const VoltageMeasurement = require('../models/VoltageMeasurement');
const seedVoltageData = require('../utilities/seed');

const router = express.Router();

// POST Request to delete data and reset it to 24 hours starting from current time
router.post('/', async (req, res) => {
  try {
    await VoltageMeasurement.deleteMany({});
    const count = await seedVoltageData();
    res.json({ message: `Reset complete. Inserted ${count} records.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
