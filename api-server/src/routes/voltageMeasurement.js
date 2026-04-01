const express = require('express');
const VoltageMeasurement = require('../models/VoltageMeasurement');

const router = express.Router();

// GET request to get array of voltage measurement objects consisting of measurement and timestamp
router.get('/', async (req, res) => {
  const { from } = req.query;
  // validate request has the required params or throw 400 err
  if (!from) {
    return res.status(400).json({ error: 'from timestamp query param is required' });
  }
  if (isNaN(Date.parse(from))) {
    return res.status(400).json({ error: 'from must be a valid date' });
  }

  // retrieve a voltage measurement object from mongoDB
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


// POST request to get array of voltage measurement objects consisting of measurement and timestamp
router.post('/', async (req, res) => {
  const { voltage, timestamp } = req.body;
  
  // validate request body has the required params or throw 400 err
  if (voltage === undefined) {
    return res.status(400).json({ error: 'voltage is required' });
  }
  if (isNaN(Number(voltage))) {
    return res.status(400).json({ error: 'voltage must be a number' });
  }
  if (timestamp !== undefined && isNaN(Date.parse(timestamp))) {
    return res.status(400).json({ error: 'timestamp must be a valid date' });
  }

  // create a voltage measurement object and save to mongoDB
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
