const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ArchitectProject — AEC Intelligence Hub</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'JetBrains Mono', monospace;
      background: #0D0D0D;
      color: #E0E0E0;
      min-height: 100vh;
    }
    .container { max-width: 900px; margin: 0 auto; padding: 40px 24px; }
    
    /* Header */
    .header-label {
      font-size: 11px; letter-spacing: 4px; color: #E8572A; font-weight: 600;
    }
    .header-sep { color: #333; margin: 0 8px; }
    .header-sub {
      font-size: 11px; letter-spacing: 4px; color: #555; font-weight: 400;
    }
    h1 {
      font-size: 32px; font-weight: 700; color: #fff;
      letter-spacing: -0.5px; margin: 8px 0 6px;
    }
    .tagline { font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 32px; }
    
    /* Status bar */
    .status-bar {
      display: flex; gap: 24px; padding: 16px 20px;
      background: #141414; border: 1px solid #222; border-radius: 8px;
      margin-bottom: 32px; flex-wrap: wrap;
    }
    .status-item { display: flex; flex-direction: column; gap: 4px; }
    .status-label { font-size: 9px; letter-spacing: 2px; color: #555; font-weight: 600; }
    .status-value { font-size: 13px; color: #ccc; }
    .status-dot {
      display: inline-block; width: 8px; height: 8px; border-radius: 50%;
      margin-right: 6px; vertical-align: middle;
    }
    .dot-live { background: #2AE86B; box-shadow: 0 0 6px #2AE86B55; }
    .dot-stub { background: #E8D42A; }
    .dot-pending { background: #555; }

    /* Tabs */
    .tabs {
      display: flex; gap: 0; margin-bottom: 0; border-bottom: 1px solid #222;
    }
    .tab {
      padding: 12px 20px; font-size: 12px; letter-spacing: 1.5px; font-weight: 500;
      color: #555; cursor: pointer; border-bottom: 2px solid transparent;
      font-family: inherit; background: none; border-top: none; border-left: none; border-right: none;
      transition: all 0.2s;
    }
    .tab:hover { color: #999; }
    .tab.active { color: #E8572A; border-bottom-color: #E8572A; }
    
    /* Panels */
    .panel { display: none; padding: 24px 0; }
    .panel.active { display: block; }

    /* Transcript input */
    .textarea-wrap { position: relative; margin-bottom: 16px; }
    textarea {
      width: 100%; min-height: 280px; padding: 16px;
      background: #111; border: 1px solid #2a2a2a; border-radius: 8px;
      color: #ccc; font-family: 'JetBrains Mono', monospace; font-size: 12px;
      line-height: 1.6; resize: vertical; outline: none;
      transition: border-color 0.2s;
    }
    textarea:focus { border-color: #E8572A44; }
    textarea::placeholder { color: #333; }
    
    .input-row { display: flex; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
    .input-field {
      flex: 1; min-width: 200px; padding: 10px 14px;
      background: #111; border: 1px solid #2a2a2a; border-radius: 6px;
      color: #ccc; font-family: inherit; font-size: 12px; outline: none;
    }
    .input-field:focus { border-color: #E8572A44; }
    .input-field::placeholder { color: #444; }

    /* Buttons */
    .btn {
      padding: 12px 28px; border: none; border-radius: 6px;
      font-family: inherit; font-size: 12px; font-weight: 600;
      letter-spacing: 1.5px; cursor: pointer; transition: all 0.2s;
    }
    .btn-primary {
      background: #E8572A; color: #fff;
    }
    .btn-primary:hover { background: #d04a22; }
    .btn-primary:disabled { background: #333; color: #666; cursor: not-allowed; }
    .btn-ghost {
      background: transparent; color: #666; border: 1px solid #333;
    }
    .btn-ghost:hover { border-color: #555; color: #999; }
    .btn-row { display: flex; gap: 12px; align-items: center; }

    /* Results */
    .results { margin-top: 24px; }
    .result-section { margin-bottom: 24px; }
    .result-header {
      font-size: 11px; letter-spacing: 2px; color: #E8572A; font-weight: 600;
      margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #1a1a1a;
    }
    .result-summary {
      font-size: 13px; color: #ccc; line-height: 1.7;
      padding: 16px; background: #111; border-radius: 6px; border-left: 3px solid #E8572A;
    }
    .action-item {
      padding: 12px 16px; background: #111; border-radius: 6px;
      margin-bottom: 8px; border-left: 3px solid #2A8BE8;
    }
    .action-task { font-size: 13px; color: #ccc; margin-bottom: 6px; line-height: 1.5; }
    .action-meta { display: flex; gap: 12px; flex-wrap: wrap; }
    .action-tag {
      font-size: 9px; font-weight: 600; letter-spacing: 1px;
      padding: 2px 8px; border-radius: 3px;
    }
    .tag-owner { color: #2A8BE8; background: rgba(42,139,232,0.12); }
    .tag-priority-critical { color: #E8572A; background: rgba(232,87,42,0.12); }
    .tag-priority-high { color: #E8D42A; background: rgba(232,212,42,0.12); }
    .tag-priority-medium { color: #888; background: rgba(136,136,136,0.1); }
    .tag-priority-low { color: #555; background: rgba(85,85,85,0.1); }
    .tag-dept { color: #9B59B6; background: rgba(155,89,182,0.12); }
    
    .decision-item {
      padding: 12px 16px; background: #111; border-radius: 6px;
      margin-bottom: 8px; border-left: 3px solid #2AE86B;
    }
    .decision-text { font-size: 13px; color: #ccc; margin-bottom: 6px; line-height: 1.5; }
    
    .risk-item {
      padding: 12px 16px; background: #111; border-radius: 6px;
      margin-bottom: 8px; border-left: 3px solid #E8D42A;
    }
    .risk-text { font-size: 13px; color: #ccc; margin-bottom: 6px; line-height: 1.5; }

    .followup-item {
      padding: 12px 16px; background: #111; border-radius: 6px;
      margin-bottom: 8px; border-left: 3px solid #9B59B6;
    }

    /* Loading */
    .loading { text-align: center; padding: 40px; }
    .spinner {
      display: inline-block; width: 24px; height: 24px;
      border: 2px solid #333; border-top-color: #E8572A;
      border-radius: 50%; animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .loading-text { font-size: 12px; color: #555; margin-top: 12px; letter-spacing: 1px; }

    /* Projects tab */
    .project-card {
      padding: 16px; background: #111; border: 1px solid #1a1a1a;
      border-radius: 8px; margin-bottom: 12px; cursor: pointer;
      transition: border-color 0.2s;
    }
    .project-card:hover { border-color: #333; }
    .project-name { font-size: 14px; color: #ccc; font-weight: 600; margin-bottom: 4px; }
    .project-meta { font-size: 11px; color: #555; }

    .empty-state {
      text-align: center; padding: 48px 24px; color: #333;
    }
    .empty-state-icon { font-size: 32px; margin-bottom: 12px; }
    .empty-state-text { font-size: 13px; line-height: 1.6; }

    /* Error */
    .error-msg {
      padding: 12px 16px; background: rgba(232,87,42,0.08);
      border: 1px solid #E8572A33; border-radius: 6px;
      font-size: 12px; color: #E8572A; margin-top: 16px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div style="margin-bottom: 32px;">
      <div>
        <span class="header-label">PROJECT</span>
        <span class="header-sep">///</span>
        <span class="header-sub">AEC INTELLIGENCE HUB</span>
      </div>
      <h1>ArchitectProject</h1>
      <p class="tagline">AI-powered project coordination for architecture firms.<br>Paste a meeting transcript. Get action items, decisions, and risks — instantly.</p>
    </div>

    <!-- Status bar -->
    <div class="status-bar">
      <div class="status-item">
        <span class="status-label">SERVER</span>
        <span class="status-value"><span class="status-dot dot-live"></span>Live</span>
      </div>
      <div class="status-item">
        <span class="status-label">AI ENGINE</span>
        <span class="status-value" id="ai-status"><span class="status-dot dot-pending"></span>Checking...</span>
      </div>
      <div class="status-item">
        <span class="status-label">TEAMS API</span>
        <span class="status-value"><span class="status-dot dot-pending"></span>Phase 2</span>
      </div>
      <div class="status-item">
        <span class="status-label">ACC</span>
        <span class="status-value"><span class="status-dot dot-pending"></span>Phase 2</span>
      </div>
      <div class="status-item">
        <span class="status-label">BLUEBEAM</span>
        <span class="status-value"><span class="status-dot dot-pending"></span>Phase 2</span>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <button class="tab active" onclick="switchTab('transcript')">PARSE TRANSCRIPT</button>
      <button class="tab" onclick="switchTab('projects')">PROJECTS</button>
      <button class="tab" onclick="switchTab('history')">MEETING HISTORY</button>
    </div>

    <!-- Transcript Panel -->
    <div id="panel-transcript" class="panel active">
      <div class="input-row">
        <input class="input-field" id="meeting-title" placeholder="Meeting title (optional)" />
        <input class="input-field" id="project-name" placeholder="Project name (optional)" />
      </div>
      <div class="input-row">
        <input class="input-field" id="attendees" placeholder="Attendees — comma separated (optional)" />
      </div>
      <div class="textarea-wrap">
        <textarea id="transcript-input" placeholder="Paste your Teams meeting transcript here...

Example:
00:00:12 John Smith
We need to finalize the electrical panel layout for the Los Altos project before the 50% CD deadline.

00:00:25 Sarah Chen  
The health department comments came back on Bluebeam. They flagged three issues with the ventilation system.

00:00:38 John Smith
Can you coordinate with the mechanical engineer by Friday? We can't submit until those are resolved."></textarea>
      </div>
      <div class="btn-row">
        <button class="btn btn-primary" id="parse-btn" onclick="parseTranscript()">PARSE TRANSCRIPT</button>
        <button class="btn btn-ghost" onclick="clearForm()">CLEAR</button>
        <span id="char-count" style="font-size: 11px; color: #333; margin-left: auto;"></span>
      </div>

      <div id="loading" class="loading" style="display: none;">
        <div class="spinner"></div>
        <div class="loading-text">AI is parsing your transcript...</div>
      </div>

      <div id="error" class="error-msg" style="display: none;"></div>

      <div id="results" class="results" style="display: none;"></div>
    </div>

    <!-- Projects Panel -->
    <div id="panel-projects" class="panel">
      <div style="margin-bottom: 16px;">
        <div class="input-row">
          <input class="input-field" id="new-project-name" placeholder="New project name" />
          <select class="input-field" id="new-project-phase" style="max-width: 160px;">
            <option value="SD">SD — Schematic Design</option>
            <option value="DD" selected>DD — Design Development</option>
            <option value="CD-25">CD — 25%</option>
            <option value="CD-50">CD — 50%</option>
            <option value="CD-100">CD — 100%</option>
            <option value="CA">CA — Construction Admin</option>
          </select>
          <button class="btn btn-primary" onclick="createProject()" style="padding: 10px 20px;">ADD</button>
        </div>
      </div>
      <div id="projects-list"></div>
    </div>

    <!-- History Panel -->
    <div id="panel-history" class="panel">
      <div id="history-list">
        <div class="empty-state">
          <div class="empty-state-icon">📋</div>
          <div class="empty-state-text">No meetings parsed yet.<br>Paste a transcript to get started.</div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="margin-top: 48px; padding-top: 16px; border-top: 1px solid #1a1a1a; display: flex; justify-content: space-between;">
      <span style="font-size: 11px; color: #333; letter-spacing: 2px;">DAVE × GARTH</span>
      <span style="font-size: 11px; color: #333;">v0.1.0</span>
    </div>
  </div>

  <script>
    const API = window.location.origin;
    let meetingHistory = [];

    // Check AI status on load
    fetch(API + '/api/health')
      .then(r => r.json())
      .then(d => {
        document.getElementById('ai-status').innerHTML =
          '<span class="status-dot dot-live"></span>Connected';
      })
      .catch(() => {
        document.getElementById('ai-status').innerHTML =
          '<span class="status-dot" style="background:#E8572A"></span>Error';
      });

    // Char count
    document.getElementById('transcript-input').addEventListener('input', function() {
      const len = this.value.length;
      document.getElementById('char-count').textContent = len > 0 ? len.toLocaleString() + ' chars' : '';
    });

    // Tab switching
    function switchTab(tab) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById('panel-' + tab).classList.add('active');
      if (tab === 'projects') loadProjects();
      if (tab === 'history') renderHistory();
    }

    // Parse transcript
    async function parseTranscript() {
      const transcript = document.getElementById('transcript-input').value.trim();
      if (!transcript) return;

      const title = document.getElementById('meeting-title').value.trim();
      const project = document.getElementById('project-name').value.trim();
      const attendeesRaw = document.getElementById('attendees').value.trim();
      const attendees = attendeesRaw ? attendeesRaw.split(',').map(a => a.trim()) : [];

      document.getElementById('parse-btn').disabled = true;
      document.getElementById('loading').style.display = 'block';
      document.getElementById('results').style.display = 'none';
      document.getElementById('error').style.display = 'none';

      try {
        const res = await fetch(API + '/api/meetings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, projectId: project, transcript, attendees }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Parse failed');

        meetingHistory.unshift(data.meeting);
        renderResults(data.meeting);
      } catch (err) {
        document.getElementById('error').textContent = err.message;
        document.getElementById('error').style.display = 'block';
      } finally {
        document.getElementById('parse-btn').disabled = false;
        document.getElementById('loading').style.display = 'none';
      }
    }

    // Render results
    function renderResults(meeting) {
      const el = document.getElementById('results');
      let html = '';

      // Summary
      if (meeting.summary) {
        html += '<div class="result-section">';
        html += '<div class="result-header">SUMMARY</div>';
        html += '<div class="result-summary">' + escHtml(meeting.summary) + '</div>';
        html += '</div>';
      }

      // Action Items
      if (meeting.actionItems && meeting.actionItems.length > 0) {
        html += '<div class="result-section">';
        html += '<div class="result-header">ACTION ITEMS (' + meeting.actionItems.length + ')</div>';
        meeting.actionItems.forEach(item => {
          html += '<div class="action-item">';
          html += '<div class="action-task">' + escHtml(item.task) + '</div>';
          html += '<div class="action-meta">';
          if (item.owner) html += '<span class="action-tag tag-owner">' + escHtml(item.owner) + '</span>';
          if (item.priority) html += '<span class="action-tag tag-priority-' + item.priority + '">' + item.priority.toUpperCase() + '</span>';
          if (item.department) html += '<span class="action-tag tag-dept">' + escHtml(item.department) + '</span>';
          if (item.deadline && item.deadline !== 'TBD') html += '<span class="action-tag" style="color:#ccc;background:#1a1a1a;">Due: ' + escHtml(item.deadline) + '</span>';
          html += '</div></div>';
        });
        html += '</div>';
      }

      // Decisions
      if (meeting.decisions && meeting.decisions.length > 0) {
        html += '<div class="result-section">';
        html += '<div class="result-header" style="color:#2AE86B;">DECISIONS (' + meeting.decisions.length + ')</div>';
        meeting.decisions.forEach(item => {
          html += '<div class="decision-item">';
          html += '<div class="decision-text">' + escHtml(item.decision) + '</div>';
          if (item.madeBy) html += '<span class="action-tag tag-owner">' + escHtml(item.madeBy) + '</span> ';
          if (item.impacts) html += '<span class="action-tag tag-dept">' + escHtml(String(item.impacts)) + '</span>';
          html += '</div>';
        });
        html += '</div>';
      }

      // Risks
      if (meeting.risks && meeting.risks.length > 0) {
        html += '<div class="result-section">';
        html += '<div class="result-header" style="color:#E8D42A;">RISKS (' + meeting.risks.length + ')</div>';
        meeting.risks.forEach(item => {
          html += '<div class="risk-item">';
          html += '<div class="risk-text">' + escHtml(item.risk) + '</div>';
          if (item.severity) html += '<span class="action-tag tag-priority-' + item.severity + '">' + item.severity.toUpperCase() + '</span> ';
          if (item.mitigation) html += '<span style="font-size:11px;color:#666;">Mitigation: ' + escHtml(item.mitigation) + '</span>';
          html += '</div>';
        });
        html += '</div>';
      }

      // Follow-ups
      if (meeting.followUps && meeting.followUps.length > 0) {
        html += '<div class="result-section">';
        html += '<div class="result-header" style="color:#9B59B6;">FOLLOW-UPS (' + meeting.followUps.length + ')</div>';
        meeting.followUps.forEach(item => {
          html += '<div class="followup-item">';
          html += '<div style="font-size:13px;color:#ccc;line-height:1.5;">' + escHtml(item.description) + '</div>';
          if (item.participants) html += '<div style="font-size:11px;color:#666;margin-top:4px;">With: ' + escHtml(String(item.participants)) + '</div>';
          html += '</div>';
        });
        html += '</div>';
      }

      if (!html) {
        html = '<div class="empty-state"><div class="empty-state-text">No structured data extracted. Try a longer transcript.</div></div>';
      }

      el.innerHTML = html;
      el.style.display = 'block';
    }

    // Projects
    async function loadProjects() {
      try {
        const res = await fetch(API + '/api/projects');
        const data = await res.json();
        const list = document.getElementById('projects-list');
        if (!data.projects || data.projects.length === 0) {
          list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🏗️</div><div class="empty-state-text">No projects yet. Add one above.</div></div>';
          return;
        }
        list.innerHTML = data.projects.map(p =>
          '<div class="project-card">' +
          '<div class="project-name">' + escHtml(p.name) + '</div>' +
          '<div class="project-meta">' + escHtml(p.phase) + ' · ' + escHtml(p.address || 'No address') + ' · Created ' + new Date(p.createdAt).toLocaleDateString() + '</div>' +
          '</div>'
        ).join('');
      } catch (err) {
        document.getElementById('projects-list').innerHTML = '<div class="error-msg">' + err.message + '</div>';
      }
    }

    async function createProject() {
      const name = document.getElementById('new-project-name').value.trim();
      if (!name) return;
      const phase = document.getElementById('new-project-phase').value;
      await fetch(API + '/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phase }),
      });
      document.getElementById('new-project-name').value = '';
      loadProjects();
    }

    // History
    function renderHistory() {
      const list = document.getElementById('history-list');
      if (meetingHistory.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📋</div><div class="empty-state-text">No meetings parsed yet.<br>Paste a transcript to get started.</div></div>';
        return;
      }
      list.innerHTML = meetingHistory.map(m =>
        '<div class="project-card" onclick=\\'showMeeting("' + m.id + '\\")\\'>' +
        '<div class="project-name">' + escHtml(m.title) + '</div>' +
        '<div class="project-meta">' +
        (m.actionItems ? m.actionItems.length : 0) + ' actions · ' +
        (m.decisions ? m.decisions.length : 0) + ' decisions · ' +
        new Date(m.processedAt).toLocaleString() +
        '</div></div>'
      ).join('');
    }

    function showMeeting(id) {
      const m = meetingHistory.find(m => m.id === id);
      if (m) {
        switchTabDirect('transcript');
        renderResults(m);
      }
    }

    function switchTabDirect(tab) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      document.querySelector('.tab').classList.add('active');
      document.getElementById('panel-' + tab).classList.add('active');
    }

    function clearForm() {
      document.getElementById('transcript-input').value = '';
      document.getElementById('meeting-title').value = '';
      document.getElementById('project-name').value = '';
      document.getElementById('attendees').value = '';
      document.getElementById('results').style.display = 'none';
      document.getElementById('error').style.display = 'none';
      document.getElementById('char-count').textContent = '';
    }

    function escHtml(str) {
      const d = document.createElement('div');
      d.textContent = str;
      return d.innerHTML;
    }
  </script>
</body>
</html>`);
});

module.exports = router;
