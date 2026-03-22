const config = require('../config');
const { logger } = require('../utils/logger');

/**
 * General-purpose Claude API call for project Q&A
 * "Catch me up on the Los Altos project" type queries
 */
async function askAboutProject(question, projectContext) {
  if (!config.anthropic.apiKey) {
    return { answer: 'Configure ANTHROPIC_API_KEY to enable project Q&A.' };
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.anthropic.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: `You are a project intelligence assistant for an architecture firm. You have access to meeting transcripts, action items, decisions, and project data. Answer questions concisely and cite specific meetings/dates when possible. If you don't have enough data to answer, say so clearly.`,
        messages: [
          {
            role: 'user',
            content: `Project data:\n${JSON.stringify(projectContext, null, 2)}\n\nQuestion: ${question}`,
          },
        ],
      }),
    });

    const data = await response.json();
    return { answer: data.content[0]?.text || 'No response generated.' };
  } catch (err) {
    logger.error(`Project Q&A failed: ${err.message}`);
    return { answer: 'Failed to process question. Check logs.' };
  }
}

module.exports = { askAboutProject };
