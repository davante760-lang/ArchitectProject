# Garth Requirements Dump — Voice Memo, March 2026

*Raw transcription from Garth describing what the hub needs to do. This is the product spec spoken by the end user.*

---

## 1. PROJECT ORGANIZATION — New Project Creation

**Auto-create folder structure on project setup:**
- Drawings folder
- PDFs base
- Admin folder
- Revision logs
- Subsequent sub-folders per discipline

**Revision logs are critical:**
- When changes are made and they don't work, you need to go back
- Revision logs are the #1 time killer
- Need to track what changed, when, by who, and what it replaced

**Admin organization:**
- Calculations
- Accounts
- Commands
- Auto-populated standards

**Auto-populate company standards:**
- Every project needs title blocks, certain clearances
- Auto-populate with company standards by default
- When head architect or client provides their own → swap it in
- Until then, use the firm's standard as placeholder

**Organize by job type:**
- Private
- Commercial
- Government

**Organize by subtype:**
- Renovation
- New structure
- DSA (Division of State Architect — California school/hospital projects)
- Government projects

*Each type requires different things — different codes, different review processes, different submittal requirements.*

---

## 2. CONTACT SHEET PER PROJECT

**Auto-generate contact reference based on project location:**
- Job is in San Diego County → system knows it goes through San Diego County Health Department
- Who is the manager at that department?
- Whose desk do these plans end up on?
- Do they have prior issues with previous submissions?
- Do they allow variations?
- Where will you find friction down the line?

**Reference past projects in same jurisdiction:**
- Projects in that area to reference
- Code variations by jurisdiction
- Plan checker history/tendencies

---

## 3. TIMELINE — LIVING CALENDARS

**Phase-based timeline:**
- Schematic Design (SD)
- Design Development (DD)
- Construction Documents (CD)
- Post-construction / CA

**Living calendar features:**
- Actionable items to be coordinated
- Items flagged as requiring follow-up
- Code changes flagged automatically

---

## 4. CODE COMPLIANCE

**At-a-glance code lookup:**
- State codes
- County codes
- City codes
- Searchable by project area/address

---

## 5. QA/QC TIMELINE

**QA/QC queue manager:**
- Link all relevant programs to project
- Checklist of all major project milestones
- Flag condensed timelines
- Flag non-standard deliverables

**Coordination meeting markers:**
- Example: "Electrical panels need to be consulted with electrical consultant prior to 50% CDs"
- System flags these coordination requirements automatically

**Domino effect tracking:**
- Flag all revisions that require cascading changes
- If X changes, what else is affected?

---

## KEY THEMES FROM THIS MEMO

1. **Institutional knowledge capture** — Knowing which plan checker is difficult, which jurisdictions allow variations, what happened on past projects in the same area
2. **Proactive flagging** — Don't wait for problems. Flag coordination requirements, code changes, and domino effects before they become crises
3. **Standards automation** — Stop recreating title blocks and folder structures from scratch every project
4. **Jurisdiction intelligence** — The same building designed for San Diego vs. Nevada vs. Los Altos has different code requirements, different review processes, different friction points
5. **Living documents** — Calendars, checklists, and timelines that update as the project evolves, not static PDFs that go stale

---

*This is the user speaking. Every feature he described comes from real pain. Build for this.*
