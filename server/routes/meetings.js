const express = require('express');
const router = express.Router();
const { logger } = require('../utils/logger');
const { parseTranscript } = require('../services/transcriptParser');

// POST /api/meetings — ingest a meeting transcript
router.post('/', async (req, res) => {
  try {
    const { projectId, title, transcript, date, attendees } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: 'Transcript text required' });
    }

    logger.info(`Processing transcript for: ${title || 'Untitled meeting'}`);

    // Parse transcript through AI engine
    const parsed = await parseTranscript(transcript, {
      projectId,
      title,
      attendees,
    });

    const meeting = {
      id: `mtg_${Date.now()}`,
      projectId: projectId || null,
      title: title || parsed.suggestedTitle || 'Untitled Meeting',
      date: date || new Date().toISOString(),
      attendees: attendees || parsed.detectedAttendees || [],
      rawTranscript: transcript,
      summary: parsed.summary,
      actionItems: parsed.actionItems,
      decisions: parsed.decisions,
      risks: parsed.risks,
      followUps: parsed.followUps,
      processedAt: new Date().toISOString(),
    };

    logger.info(`Meeting processed: ${meeting.actionItems.length} action items, ${meeting.decisions.length} decisions`);

    // Broadcast to WebSocket clients
    const wss = req.app.get('wss');
    if (wss) {
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({
            type: 'MEETING_PROCESSED',
            data: {
              meetingId: meeting.id,
              title: meeting.title,
              actionItemCount: meeting.actionItems.length,
              decisionCount: meeting.decisions.length,
            }
          }));
        }
      });
    }

    res.status(201).json({ meeting });
  } catch (err) {
    logger.error(`Transcript processing failed: ${err.message}`);
    res.status(500).json({ error: 'Failed to process transcript' });
  }
});

module.exports = router;
