require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const { registerRoutes, clientBuildPath } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(require('express').static(clientBuildPath));

connectDB().catch((err) => {
  console.error('Failed to connect to MongoDB:', err.message);
  process.exit(1);
});

registerRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
