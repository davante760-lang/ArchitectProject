# ArchitectProject — AEC Intelligence Hub

> AI-powered project coordination hub for architecture firms. Sits on top of Autodesk Construction Cloud, Bluebeam Revu, Microsoft Teams, and Outlook — creating a single source of truth across Design, PM, Construction Admin, and Business Admin departments.

## The Problem

Architecture firms run on 4+ disconnected platforms. Decisions made in Teams meetings don't cascade to Construction Cloud. Bluebeam markup comments live in a silo. When someone leaves, institutional knowledge walks out the door. A single miscommunication (gas vs. electric, wrong code jurisdiction) can force a project to revert from 50% CDs back to DD — hundreds of thousands in free rework.

## The Solution

A lightweight AI hub that **watches what teams already do** (Teams meetings, emails, file uploads) and synthesizes it — no workflow changes required.

### Phase 1: Meeting Intelligence (MVP)
- Ingest Microsoft Teams meeting transcripts via Graph API
- AI-parse into: action items, decisions made, blockers, owner assignments
- Organize by project with living decision log
- "Catch me up" — any team member can ask the hub what happened on a project

### Phase 2: Cross-Platform Sync
- Connect to Autodesk Construction Cloud API (file changes, version tracking)
- Connect to Bluebeam Studio API (markup comments, session updates, webhooks)
- Unified project timeline: meetings + file changes + comments in one view

### Phase 3: Proactive Intelligence
- AI scans for code compliance issues before construction phase
- Living calendars with auto-populated deadlines and warnings
- Cross-department cascade alerts (scope change → notify all affected teams)
- Historical pattern matching ("how did we get X approved on the Nevada project?")

## Tech Stack

- **Runtime:** Node.js / Express
- **Transcription:** Microsoft Graph API (Teams transcripts) + Deepgram (fallback)
- **AI Engine:** Anthropic Claude API (action item extraction, summarization, Q&A)
- **Database:** PostgreSQL (project data, decision logs, action items)
- **Real-time:** WebSocket (live updates)
- **Deployment:** Railway
- **Frontend:** React (dashboard)

## Project Structure

```
├── server/
│   ├── index.js                 # Express server entry point
│   ├── config/
│   │   └── index.js             # Environment config
│   ├── routes/
│   │   ├── projects.js          # Project CRUD
│   │   ├── meetings.js          # Meeting transcript ingestion
│   │   ├── actions.js           # Action items API
│   │   └── health.js            # Health check
│   ├── services/
│   │   ├── msGraph.js           # Microsoft Graph API client
│   │   ├── transcriptParser.js  # AI transcript → structured data
│   │   ├── bluebeam.js          # Bluebeam Studio API client (Phase 2)
│   │   ├── accCloud.js          # Autodesk Construction Cloud client (Phase 2)
│   │   └── aiEngine.js          # Claude API integration
│   ├── models/
│   │   ├── project.js           # Project model
│   │   ├── meeting.js           # Meeting/transcript model
│   │   ├── actionItem.js        # Action item model
│   │   └── decision.js          # Decision log model
│   └── utils/
│       ├── logger.js            # Logging utility
│       └── errors.js            # Error handling
├── client/                      # React dashboard (Phase 2)
├── docs/
│   ├── COMPETITIVE_LANDSCAPE.md # Newforma, Egnyte, Monograph analysis
│   ├── GARTH_PAIN_POINTS.md     # Raw pain point documentation
│   └── API_RESEARCH.md          # ACC, Bluebeam, Graph API notes
├── transcripts/                 # Brainstorm session transcripts
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Competitive Landscape

| Company | What They Do | Gap |
|---------|-------------|-----|
| **Newforma Konekt** | PIM + BIM coordination, 4.5M users | Enterprise-heavy, document-first, no AI meeting intelligence |
| **Egnyte Project Hub** | File governance + AI copilot, ACC/Bluebeam sync | File management DNA, not operational intelligence |
| **Monograph** | Fee tracking, budget dashboards for architects | Financial only, no cross-platform communication |
| **Procore** | Construction management platform | Construction-phase focused, heavy, expensive |
| **IntoAEC** | AI PM + CRM for AEC | Generic PM, not solving the cross-platform hub problem |

**Our edge:** AI-first, meeting-intelligence-native, zero workflow change required.

## Getting Started

```bash
# Clone
git clone https://github.com/davante760-lang/ArchitectProject.git
cd ArchitectProject

# Install
npm install

# Configure
cp .env.example .env
# Add your API keys to .env

# Run
npm run dev
```

## Environment Variables

```
PORT=3000
NODE_ENV=development

# Microsoft Graph API (Teams transcripts)
MS_CLIENT_ID=
MS_CLIENT_SECRET=
MS_TENANT_ID=

# Anthropic Claude API
ANTHROPIC_API_KEY=

# Database
DATABASE_URL=

# Bluebeam API (Phase 2)
BLUEBEAM_CLIENT_ID=
BLUEBEAM_CLIENT_SECRET=

# Autodesk Construction Cloud (Phase 2)
ACC_CLIENT_ID=
ACC_CLIENT_SECRET=
```

## Founders

- **Dave Alexander** — Technical build, AI/automation, sales strategy
- **Garth** — Domain expert, architecture industry, end user

---

*Built from a coffee shop conversation about how broken architecture firm communication is. Every line of code here exists because someone had to revert a project from 50% CDs back to DD.*
