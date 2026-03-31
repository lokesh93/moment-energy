const express = require('express');
const VoltageMeasurement = require('../models/VoltageMeasurement');

const router = express.Router();

router.get('/', async (req, res) => {
  const { from } = req.query;

  if (!from) {
    return res.status(400).json({ error: 'from timestamp query param is required' });
  }
  if (isNaN(Date.parse(from))) {
    return res.status(400).json({ error: 'from must be a valid date' });
  }

  try {
    const measurements = await VoltageMeasurement.find({
      created_at: { $gte: new Date(from) },
    }).sort({ created_at: 1 });
    console.log("measurements.length ====>", measurements.length)
    res.json(measurements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { voltage, timestamp } = req.body;

  if (voltage === undefined) {
    return res.status(400).json({ error: 'voltage is required' });
  }
  if (isNaN(Number(voltage))) {
    return res.status(400).json({ error: 'voltage must be a number' });
  }
  if (timestamp !== undefined && isNaN(Date.parse(timestamp))) {
    return res.status(400).json({ error: 'timestamp must be a valid date' });
  }

  try {
    const measurement = await VoltageMeasurement.create({
      voltage: Number(voltage),
      created_at: timestamp ? new Date(timestamp) : undefined,
    });
    res.status(201).json(measurement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
