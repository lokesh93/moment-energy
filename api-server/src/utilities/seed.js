const VoltageMeasurement = require('../models/VoltageMeasurement');

async function seedVoltageData() {
  const STEP_SECONDS = 10;
  const DURATION_SECONDS = 24 * 60 * 60;
  const VOLTAGE_STEP = 0.01;
  const VOLTAGE_MAX = 5;
  const VOLTAGE_MIN = 0;

  const startTime = new Date(Date.now() - DURATION_SECONDS * 1000);

  const records = [];
  let voltage = 0;
  let direction = 1;

  for (let elapsed = 0; elapsed <= DURATION_SECONDS; elapsed += STEP_SECONDS) {
    records.push({
      voltage: Math.round(voltage * 100) / 100,
      created_at: new Date(startTime.getTime() + elapsed * 1000),
    });

    voltage += VOLTAGE_STEP * direction;

    if (voltage >= VOLTAGE_MAX) {
      voltage = VOLTAGE_MAX;
      direction = -1;
    } else if (voltage <= VOLTAGE_MIN) {
      voltage = VOLTAGE_MIN;
      direction = 1;
    }
  }

  await VoltageMeasurement.insertMany(records);
  return records.length;
}

module.exports = seedVoltageData;
