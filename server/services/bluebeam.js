/**
 * Bluebeam Studio API Client (Phase 2)
 * 
 * Handles Bluebeam Studio session monitoring and markup retrieval.
 * Requires BLUEBEAM_CLIENT_ID, BLUEBEAM_CLIENT_SECRET in env.
 * 
 * Capabilities:
 * - Sessions Roundtrips: Launch Studio Sessions from the hub
 * - Webhooks: Subscribe to session updates (markups, comments)
 * - Markups API: Access and track markup status changes
 * 
 * Auth: OAuth 2.0
 * Base URL (US): https://api.bluebeam.com/publicapi/v1
 * Dev Portal: https://developers.bluebeam.com
 * 
 * TODO: Implement in Phase 2 after MVP validation
 */

const { logger } = require('../utils/logger');

class BluebeamClient {
  constructor() {
    logger.info('BluebeamClient initialized (Phase 2 — not yet implemented)');
  }

  async getSessionMarkups(sessionId) {
    // TODO: Phase 2
    return [];
  }

  async subscribeToWebhook(sessionId, callbackUrl) {
    // TODO: Phase 2
    return null;
  }
}

module.exports = { BluebeamClient };
