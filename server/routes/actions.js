const express = require('express');
const router = express.Router();

// GET /api/actions — list action items (filterable by project, owner, status)
router.get('/', (req, res) => {
  // TODO: Wire to database
  res.json({ actionItems: [], filters: req.query });
});

// PATCH /api/actions/:id — update action item status
router.patch('/:id', (req, res) => {
  const { status, owner, notes } = req.body;
  // TODO: Wire to database
  res.json({ updated: true, id: req.params.id });
});

module.exports = router;
