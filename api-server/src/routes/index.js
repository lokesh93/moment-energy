const path = require('path');
const voltageMeasurementRoutes = require('./voltageMeasurement');
const resetDataRoutes = require('./resetData');

const clientBuildPath = path.join(__dirname, '../../../client/dist');

function registerRoutes(app) {
  app.use('/voltage-measurement', voltageMeasurementRoutes);
  app.use('/reset-data', resetDataRoutes);

  app.get('/', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

module.exports = { registerRoutes, clientBuildPath };
