# Garth Pain Points — Raw Documentation

*Source: Coffee shop brainstorm session, March 2026*
*This doc captures real pain points from a working architect. These are our feature backlog.*

---

## Pain Point 1: Project Reversion (The Los Altos Disaster)
- **What happened:** Project was at 50% CDs. Had to revert back to DD level.
- **Why:** Previous team member (Mimi) left. Her projects had no documentation trail.
- **Cost:** All rework from DD to CD was free labor — firm couldn't charge a change order because it was their fault.
- **Quote:** "I took over three other projects. I'm still catching up."
- **Feature implication:** Institutional memory that survives personnel turnover. "Catch me up" feature.

## Pain Point 2: Code Compliance Surprises
- **What happened:** Project designed assuming natural gas. Mid-project discovery: California code requires electrical.
- **Why:** Information buried across 20+ subcontractor relationships. Red flags don't surface until construction phase.
- **Cost:** Entire strand has to restart from zero.
- **Quote:** "It's like finding a needle in the haystack because you're overlooking so many things."
- **Feature implication:** AI code compliance scanning before construction phase. Cross-reference project address with jurisdiction codes.

## Pain Point 3: Construction Cloud Is a Glorified Folder
- **What happened:** Construction Cloud stores CAD/drawing files but has no AI, no intelligence layer.
- **Why:** Everyone uploads differently. No naming conventions. No automation.
- **Quote:** "It's just like a giant folder for everybody to put their shit in. There's no AI behind it."
- **Feature implication:** Intelligent layer on top of ACC that normalizes, indexes, and makes files searchable/actionable.

## Pain Point 4: Bluebeam and Construction Cloud Don't Talk
- **What happened:** Same files exist in two places — CAD drawings in Construction Cloud, PDF markups in Bluebeam.
- **Why:** Health department sends comments back as PDFs in Bluebeam. Engineers work in Construction Cloud. No bridge.
- **Quote:** "Now you have two of the same files, just one's the actual drawings, one's PDFs, and now you have to go back and forth."
- **Feature implication:** Unified view that bridges ACC drawing files and Bluebeam PDF markups for the same project.

## Pain Point 5: Meeting Decisions Don't Go Anywhere
- **What happened:** Design meetings happen on Teams. Notes are handwritten and uploaded to OneNote manually.
- **Why:** Nobody uses AI note takers consistently. Nobody uploads transcripts. Nobody sifts through them.
- **Quote:** "You're in the meeting, you write down the notes and then you upload it to OneNote."
- **Feature implication:** Auto-capture Teams transcripts → AI-parsed action items → routed to responsible parties.

## Pain Point 6: Sign-Off Communication Gaps
- **What happened:** Design team produced work. Person responsible for telling the chief architect didn't relay the info. Chief architect sees it 24 hours before deadline, rejects it.
- **Why:** No automated cascade notification when decisions/deliverables move between departments.
- **Quote:** "Now we look like the asshole because we gave him bad design."
- **Feature implication:** Cascade alerts. When a deliverable moves from one phase/department to the next, all stakeholders are notified automatically.

## Pain Point 7: Finding Past Approvals Takes Weeks
- **What happened:** Building in Nevada needed to reference how a similar approval was obtained in a past project.
- **Why:** Have to dig through old project folders manually. If the person who got the approval left, it could take weeks.
- **Quote:** "If you remember it, it's quick. If you got fired... it could take them weeks."
- **Feature implication:** AI-powered search across all project history. "How did we get X approved on the Nevada project?"

## Pain Point 8: Naming Convention Chaos
- **What happened:** Everyone does different naming conventions, different styles across teams and projects.
- **Why:** No enforced standard. Construction Cloud doesn't enforce it.
- **Quote:** "It's so hard to get everybody on a universal single thing."
- **Feature implication:** Auto-normalize file naming on upload. Or at minimum, make files findable regardless of naming convention.

---

## The Four Departments (Every Architecture Firm)
1. **Design** — Creates the drawings, CAD work
2. **Project Management** — Coordinates timelines, budgets, client communication
3. **Construction Administration** — Field oversight, RFIs, submittals, inspections
4. **Business Admin** — Contracts, scope of work, billing, marketing, legal, procurement

All four touch every project. Communication between them is where things break.

## Tools Used Daily
- Autodesk Construction Cloud (CAD drawing storage/sharing)
- Bluebeam Revu (PDF markup, health dept comments, sessions)
- Revit (3D modeling / BIM)
- AutoCAD (2D drafting)
- Microsoft Teams (meetings, chat, some AI note-taking)
- Outlook (email — primary communication channel)
- OneNote (manual meeting notes)

## Project Phases
- **SD** — Schematic Design
- **DD** — Design Development (25%, 50%, 100%)
- **CD** — Construction Documents (25%, 50%, 100%)
- **CA** — Construction Administration

Major scope changes should NOT happen past DD. When they do, it's either a change order (client pays) or free rework (firm's fault).
