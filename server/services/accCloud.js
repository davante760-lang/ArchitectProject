/**
 * Autodesk Construction Cloud API Client (Phase 2)
 * 
 * Handles ACC project data, file tracking, and issue management.
 * Requires ACC_CLIENT_ID, ACC_CLIENT_SECRET in env.
 * 
 * Capabilities:
 * - Data Management API: Track file uploads, versions, folder changes
 * - Issues API: Monitor project issues and RFIs
 * - Account/Project management
 * 
 * Auth: OAuth 2.0 (2-legged and 3-legged flows)
 * Docs: https://aps.autodesk.com/developer/overview/autodesk-construction-cloud
 * Python SDK: https://github.com/realdanielbyrne/acc_sdk
 * 
 * TODO: Implement in Phase 2 after MVP validation
 */

const { logger } = require('../utils/logger');

class ACCClient {
  constructor() {
    logger.info('ACCClient initialized (Phase 2 — not yet implemented)');
  }

  async getProjectFiles(projectId) {
    // TODO: Phase 2
    return [];
  }

  async getProjectIssues(projectId) {
    // TODO: Phase 2
    return [];
  }

  async subscribeToFileChanges(projectId, callbackUrl) {
    // TODO: Phase 2
    return null;
  }
}

module.exports = { ACCClient };
