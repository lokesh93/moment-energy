require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const { registerRoutes, clientBuildPath } = require('./routes');

// instantiate express server
const app = express();
const PORT = process.env.PORT || 3000;

// bind server to application/json processing
app.use(express.json());
app.use(require('express').static(clientBuildPath));

// connect to database
connectDB().catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});


// register routes to express app
registerRoutes(app);


// bind PORT to app
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
