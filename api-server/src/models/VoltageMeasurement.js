const mongoose = require('mongoose');

const voltageMeasurementSchema = new mongoose.Schema({
  voltage: {
    type: Number,
    required: [true, 'voltage is required'],
    validate: {
      validator: Number.isFinite,
      message: 'voltage must be a finite number',
    },
  },
  created_at: {
    type: Date,
    required: [true, 'created_at is required'],
    default: Date.now,
  },
});

module.exports = mongoose.model('voltage_measurement', voltageMeasurementSchema);
