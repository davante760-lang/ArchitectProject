const express = require('express');
const router = express.Router();
const { logger } = require('../utils/logger');

// In-memory store until we wire up PostgreSQL
let projects = [];

// GET /api/projects — list all projects
router.get('/', (req, res) => {
  res.json({ projects });
});

// GET /api/projects/:id — get single project with decision log
router.get('/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json({ project });
});

// POST /api/projects — create a project
router.post('/', (req, res) => {
  const { name, address, phase, contacts } = req.body;
  if (!name) return res.status(400).json({ error: 'Project name required' });

  const project = {
    id: `proj_${Date.now()}`,
    name,
    address: address || '',
    phase: phase || 'DD', // SD, DD, CD-25, CD-50, CD-100, CA
    contacts: contacts || [],
    meetings: [],
    actionItems: [],
    decisions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  projects.push(project);
  logger.info(`Project created: ${project.name} (${project.id})`);
  res.status(201).json({ project });
});

module.exports = router;
