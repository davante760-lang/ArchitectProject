require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const config = require('./config');
const healthRoutes = require('./routes/health');
const projectRoutes = require('./routes/projects');
const meetingRoutes = require('./routes/meetings');
const actionRoutes = require('./routes/actions');
const { logger } = require('./utils/logger');

const app = express();
const server = http.createServer(app);

// WebSocket server for live updates
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
  logger.info('Client connected to WebSocket');
  ws.on('close', () => logger.info('Client disconnected'));
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Make WSS available to routes
app.set('wss', wss);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/actions', actionRoutes);

// Error handling
app.use((err, req, res, next) => {
  logger.error(`${err.message}`, { stack: err.stack });
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

server.listen(config.port, () => {
  logger.info(`🏗️  ArchitectProject server running on port ${config.port}`);
  logger.info(`📡 WebSocket available at ws://localhost:${config.port}/ws`);
});

module.exports = { app, server };
