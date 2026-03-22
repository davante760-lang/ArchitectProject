const config = require('../config');
const { logger } = require('../utils/logger');

const SYSTEM_PROMPT = `You are an AI assistant specialized in analyzing architecture, engineering, and construction (AEC) meeting transcripts. Your job is to extract structured, actionable intelligence from project coordination meetings.

You understand AEC terminology: SD (Schematic Design), DD (Design Development), CD (Construction Documents - 25%, 50%, 100%), CA (Construction Administration), RFI, submittal, change order, scope of work, code compliance, health department review, plan check, etc.

Given a meeting transcript, extract:

1. SUMMARY: A 2-3 sentence executive summary of what was discussed and decided.

2. ACTION ITEMS: Specific tasks that need to happen. For each:
   - task: What needs to be done
   - owner: Who is responsible (extract from transcript or mark "UNASSIGNED")
   - deadline: Any mentioned deadline or "TBD"
   - priority: critical / high / medium / low
   - department: design / pm / construction_admin / admin / external

3. DECISIONS: Specific decisions that were made. For each:
   - decision: What was decided
   - madeBy: Who made/approved it
   - impacts: What departments or deliverables this affects
   - reversible: true/false

4. RISKS: Any red flags, potential issues, or concerns raised. For each:
   - risk: Description of the risk
   - severity: critical / high / medium / low
   - mitigation: Any suggested mitigation discussed

5. FOLLOW_UPS: Meetings, calls, or coordination that needs to be scheduled.
   - description: What needs to happen
   - participants: Who needs to be involved
   - suggestedTimeframe: When this should happen

6. DETECTED_ATTENDEES: Names of people mentioned or speaking in the transcript.

7. SUGGESTED_TITLE: A descriptive title for this meeting based on content.

Respond ONLY with valid JSON. No markdown, no backticks, no explanation.`;

/**
 * Parse a meeting transcript using Claude API
 */
async function parseTranscript(transcriptText, context = {}) {
  if (!config.anthropic.apiKey) {
    logger.warn('No Anthropic API key — returning mock parse');
    return getMockParse(transcriptText);
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
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: 'user',
            content: `Project context: ${context.title || 'Unknown project'}\nAttendees: ${(context.attendees || []).join(', ') || 'Unknown'}\n\n--- TRANSCRIPT ---\n${transcriptText}\n--- END TRANSCRIPT ---\n\nExtract the structured data as JSON.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Claude API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const text = data.content[0]?.text || '{}';

    // Clean potential markdown wrapping
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      summary: parsed.summary || '',
      actionItems: (parsed.action_items || parsed.actionItems || []).map((item, i) => ({
        id: `act_${Date.now()}_${i}`,
        ...item,
        status: 'open',
        createdAt: new Date().toISOString(),
      })),
      decisions: (parsed.decisions || []).map((item, i) => ({
        id: `dec_${Date.now()}_${i}`,
        ...item,
        recordedAt: new Date().toISOString(),
      })),
      risks: parsed.risks || [],
      followUps: parsed.follow_ups || parsed.followUps || [],
      detectedAttendees: parsed.detected_attendees || parsed.detectedAttendees || [],
      suggestedTitle: parsed.suggested_title || parsed.suggestedTitle || null,
    };
  } catch (err) {
    logger.error(`Transcript parse failed: ${err.message}`);
    return getMockParse(transcriptText);
  }
}

/**
 * Mock parse for development without API key
 */
function getMockParse(transcriptText) {
  return {
    summary: '[MOCK] Meeting transcript received. Configure ANTHROPIC_API_KEY for real parsing.',
    actionItems: [
      {
        id: `act_${Date.now()}_0`,
        task: 'Configure Anthropic API key for real transcript parsing',
        owner: 'Dave',
        deadline: 'TBD',
        priority: 'critical',
        department: 'admin',
        status: 'open',
        createdAt: new Date().toISOString(),
      },
    ],
    decisions: [],
    risks: [],
    followUps: [],
    detectedAttendees: [],
    suggestedTitle: 'Untitled Meeting',
  };
}

module.exports = { parseTranscript };
