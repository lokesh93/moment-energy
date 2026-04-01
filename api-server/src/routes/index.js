const path = require('path');
const voltageMeasurementRoutes = require('./voltageMeasurement');
const resetDataRoutes = require('./resetData');

// create client build path that has the index.html, index.js and css file to serve to the browser
const clientBuildPath = path.join(__dirname, '../../../client/dist');

function registerRoutes(app) {
  // bind voltage measurement and reset data routes
  app.use('/voltage-measurement', voltageMeasurementRoutes);
  app.use('/reset-data', resetDataRoutes);

  // return built index.html client file with associated assets
  app.get('/', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

module.exports = { registerRoutes, clientBuildPath };
