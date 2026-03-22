require('dotenv').config();
const express = require('express');
const config = require('./config');
const checklistRoutes = require('./routes/checklist');

const app = express();

// Checklist is the entire app
app.use('/', checklistRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '0.1.0', uptime: process.uptime() });
});

app.listen(config.port, () => {
  console.log('AEC Checklist running on port ' + config.port);
});
