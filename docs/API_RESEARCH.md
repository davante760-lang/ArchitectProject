# API Research — Integration Points

*Last updated: March 2026*

---

## 1. Microsoft Graph API (Teams Transcripts) — PHASE 1 PRIORITY

### What We Need
- Fetch meeting transcripts after Teams meetings end
- Extract AI-generated meeting insights (notes, action items, mentions)
- Subscribe to change notifications when new transcripts are available

### Auth
- OAuth 2.0 (client credentials for app-only, or delegated for per-user)
- Requires Azure AD app registration
- Application Access Policy required for app-only access to user meetings

### Key Endpoints
```
# List transcripts for a meeting
GET /users/{userId}/onlineMeetings/{meetingId}/transcripts

# Get transcript content (.vtt format)
GET /users/{userId}/onlineMeetings/{meetingId}/transcripts/{transcriptId}/content

# AI Insights (meeting notes + action items — requires Copilot license)
GET /copilot/users/{userId}/onlineMeetings/{meetingId}/aiInsights
```

### Transcript Format
- Returns .vtt (WebVTT) with speaker labels, timestamps, and text
- Speaker names included when transcription identifies them

### Change Notifications
- Subscribe to `users/{userId}/onlineMeetings/getAllTranscripts` for tenant-wide
- Or per-app: `appCatalogs/teamsApps/{appId}/installedToOnlineMeetings/getAllTranscripts`

### Gotchas
- Transcription must be enabled during the meeting (or auto-transcribe set)
- Meeting must not have expired (Teams has retention limits)
- Application Access Policy takes up to 30 min to propagate
- Metered API — may incur costs at scale

### Docs
- https://learn.microsoft.com/en-us/graph/api/onlinemeeting-list-transcripts
- https://learn.microsoft.com/en-us/microsoftteams/platform/graph-api/meeting-transcripts/overview-transcripts
- https://learn.microsoft.com/en-us/graph/teams-changenotifications-callrecording-and-calltranscript

---

## 2. Autodesk Construction Cloud (ACC) API — PHASE 2

### What We Need
- Track file uploads and version changes across projects
- Monitor issues and RFIs
- Map project folder structure

### Auth
- OAuth 2.0 (2-legged for app-level, 3-legged for user-level)
- Register app at Autodesk Platform Services (APS)

### Key APIs
- **Data Management API:** Files, folders, versions, downloads
- **Issues API:** Track and manage project issues
- **Account Users API:** User management
- **Business Units API:** Organizational structure

### Python SDK (Community)
- https://github.com/realdanielbyrne/acc_sdk
- Covers auth, data management, users, companies, business units

### Integration Platform
- ACC Connect (powered by Workato) — no-code integrations
- Supports DocuSign, Salesforce, Smartsheet, Excel, Google Sheets

### Gotchas
- 235+ existing integration partners — crowded space
- API scoping can be complex (project-level vs account-level)
- Large file handling may need special attention

### Docs
- https://aps.autodesk.com/developer/overview/autodesk-construction-cloud
- https://aps.autodesk.com/en/docs/acc/v1/overview/

---

## 3. Bluebeam Studio API — PHASE 2

### What We Need
- Monitor Studio Sessions for markup/comment changes
- Pull markup status and content
- Subscribe to webhooks for real-time updates

### Auth
- OAuth 2.0
- Register app at Bluebeam Developer Portal (developers.bluebeam.com)
- Requires Bluebeam subscription (BBID account)

### Key Capabilities
- **Sessions Roundtrips:** Launch Studio Sessions from our hub
- **Webhooks:** Subscribe to session updates (eliminates polling)
- **Markups API:** Access markup status, update from our app

### API Regions
- US: `https://api.bluebeam.com/publicapi/v1`
- AU: `https://api.bluebeamstudio.com.au/publicapi/v1`

### Gotchas
- Token expires after 1 hour — need refresh token flow
- Need `client_id` header on all requests (new platform requirement)
- Developer portal access must be requested (24-48 hour review)

### Docs
- https://developers.bluebeam.com
- https://support.bluebeam.com/integrations/develop-integrations.html
- https://support.bluebeam.com/developer/getting-started-dev-portal.html

---

## 4. Microsoft Outlook / Email — PHASE 2

### What We Need
- Monitor project-related email threads
- Extract action items and decisions from email chains
- Link emails to specific projects

### Approach
- Microsoft Graph API covers Outlook as well
- `GET /users/{userId}/messages` with filters
- Can subscribe to change notifications for new mail

### Docs
- https://learn.microsoft.com/en-us/graph/api/resources/mail-api-overview

---

## MVP Decision: Start with Manual Transcript Upload

For Phase 1, we bypass the Graph API complexity entirely:
1. Garth copies meeting transcript from Teams (or uses AI note-taker export)
2. Pastes into our hub's web interface
3. AI parses it immediately

This lets us validate the AI parsing quality before investing in the Graph API integration.
Once validated, we wire up automatic transcript fetching.
