/**
 * Microsoft Graph API Client
 * 
 * Handles Teams meeting transcript retrieval.
 * Requires MS_CLIENT_ID, MS_CLIENT_SECRET, MS_TENANT_ID in env.
 * 
 * Flow:
 * 1. Auth via OAuth2 client credentials
 * 2. List user's online meetings
 * 3. Fetch transcripts for each meeting (.vtt format)
 * 4. Pass to transcriptParser for AI extraction
 * 
 * Docs: https://learn.microsoft.com/en-us/graph/api/onlinemeeting-list-transcripts
 * 
 * TODO: Implement when Garth's firm grants API access
 */

const config = require('../config');
const { logger } = require('../utils/logger');

class MSGraphClient {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async authenticate() {
    if (!config.ms.clientId || !config.ms.clientSecret) {
      throw new Error('Microsoft Graph credentials not configured');
    }

    const tokenUrl = `https://login.microsoftonline.com/${config.ms.tenantId}/oauth2/v2.0/token`;

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: config.ms.clientId,
        client_secret: config.ms.clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      }),
    });

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000);

    logger.info('MS Graph authenticated');
    return this.accessToken;
  }

  async getTranscripts(userId, meetingId) {
    // TODO: Implement when we have Graph API access
    // GET /users/{userId}/onlineMeetings/{meetingId}/transcripts
    logger.warn('MS Graph getTranscripts not yet implemented');
    return [];
  }

  async getTranscriptContent(userId, meetingId, transcriptId) {
    // TODO: Implement
    // GET /users/{userId}/onlineMeetings/{meetingId}/transcripts/{transcriptId}/content
    logger.warn('MS Graph getTranscriptContent not yet implemented');
    return '';
  }
}

module.exports = { MSGraphClient };
