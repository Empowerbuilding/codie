# MEMORY.md — Codie Long-Term Memory
<!-- STRUCTURE NOTE: 4-tier format. A=PERMANENT (never edit/trim). B=ACTIVE PROJECTS. C=ACTIVE CLIENTS. D=RECENT SESSION NOTES (trimmable, max 20k chars, trim entries >60 days old). -->

---

## SECTION A — PERMANENT (Never Edit or Trim)

### Identity & Role
Codie — coding agent for Empower Building / Barnhaus Steel Builders. Created 2026-05-18, migrated to Agent Portal 2026-07-09. Goal: let teammates ship updates without needing Mitch.

### Core Decisions
- Push directly to deploy branch — no PRs, no feature branches
- Codie handles deploy trigger + monitoring after every push
- Only touch approved repos: `barnhaus-design-os`, `CRM`, `render-tool` (and `codie`)
- Discord disabled — all communication via Agent Portal

### Version Rules (Render Tool — from 2026-07-16)
Format: X.Y.Z.W
- W: small updates (e.g. 1.1.1.1 → 1.1.1.2)
- Z: new features (e.g. 1.1.1.2 → 1.1.2.1)
- Y: end-of-day stopping point (e.g. 1.1.2.1 → 1.2.1.1)
- X: major client-ready milestones (e.g. 1.2.1.1 → 2.1.1.1)
- Version displayed in bottom-left corner across the app.

---

## SECTION B — ACTIVE PROJECTS

### Barnhaus Design OS
**Repo:** `Empowerbuilding/barnhaus-design-os`
**Local path:** `/home/node/.openclaw/workspace/repos/barnhaus-design-os`
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS
**Coolify UUID:** `otoevzx39emjclf9m0sfrn0d`
**Deploy branch:** `master`
**URL:** https://os.empowerbuilding.ai
**Supabase ref:** `nvsczfrljlovksrdyaix`
**Portal channel:** `barnhaus-codie-design-os`
Stack patterns: Pages in `app/`, components in `components/`, Tailwind only, Supabase via REST API, TypeScript strict mode.

### Empower CRM
**Repo:** `Empowerbuilding/CRM`
**Local path:** `/home/node/.openclaw/workspace/repos/CRM`
**Stack:** Next.js, TypeScript, Tailwind CSS
**Coolify UUID:** `zcg4ko88scwc8os4s4088k00`
**Deploy branch:** `main`
**URL:** https://crm.empowerbuilding.ai
**Supabase ref:** `ejsnbluvkqocuchifdvp`
**Portal channel:** `barnhaus-codie-crm`
What it is: Empower Building CRM — Facebook lead tracking, client contacts, Meta ad feedback loop (Andromeda).

### Render Tool (Image Enhancer v2)
**Repo:** `Empowerbuilding/render-tool`
**Local path:** `/home/node/.openclaw/workspace/repos/render-tool`
**Stack:** React/Vite, TypeScript, pure frontend calling n8n webhooks
**Coolify UUID:** `yzyox9n2l8k1ydukwstsamed`
**Deploy branch:** `main`
**URL:** https://render.barnhaussteelbuilders.com
**Supabase ref:** `weqooskgyaeryoekbhzi`
**Supabase URL:** https://weqooskgyaeryoekbhzi.supabase.co
**Portal channel:** `barnhaus-codie-render-tool`
⚠️ This is the NEW version. NEVER touch `imageenhancer` repo or pic.barnhaussteelbuilders.com.
n8n webhooks are shared with the original — same endpoints.
Supabase `renders` table: id, created_at, render_type, original_image_url, enhanced_image_url, prompt, options (jsonb), metadata (jsonb).
Current Version: v1.1.2.6 (post-Library + Save State features)

---

## SECTION C — ACTIVE CLIENTS

### Supabase Keys
| Repo | Project Ref | Key Type | Service Role Key |
|---|---|---|---|
| barnhaus-design-os | `nvsczfrljlovksrdyaix` | service_role | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52c2N6ZnJsamxvdmtzcmR5YWl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODYzODQ3MywiZXhwIjoyMDk0MjE0NDczfQ.Rl8IVENc0WSpMm3d7JQzwpPV_ILp2_b6ohn1aWX-cuc` |
| CRM | `ejsnbluvkqocuchifdvp` | service_role | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqc25ibHV2a3FvY3VjaGlmZHZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjgwMTQ5NywiZXhwIjoyMDgyMzc3NDk3fQ.ZUTMAnnrwi7KPYYhkWL4Gexbn7ClrxOkG_CGWl2Q5X8` |
| render-tool | `weqooskgyaeryoekbhzi` | anon | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcW9vc2tneWFlcnlvZWtiaHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzY2ODMsImV4cCI6MjA5OTIxMjY4M30.EnQZ3gRNPDH8Nvu0OHoiQY1BevPlwwcvYRT-O9vMPmQ` |
| render-tool | `weqooskgyaeryoekbhzi` | service_role | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcW9vc2tneWFlcnlvZWtiaHppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzYzNjY4MywiZXhwIjoyMDk5MjEyNjgzfQ.xP3ZoaqYQzmp1WXRf99cioRNQ8R-mJuzxI41aBqdBB8` |

---

## SECTION D — RECENT SESSION NOTES (Trimmable — max 20k chars, trim entries >60 days old)

### 2026-08-01
- **Render Tool:** Added new "Texture Creator" tab integrated with n8n webhook (`rt-texture-creator`) using Gemini flash to generate seamless albedo textures. Updated version to v1.1.5.1.
- **Files Modified:** `src/pages/Home.jsx`, `src/App.jsx`, `TOOLS.md`.



### 2026-07-09 — Known Fixes

**Render Tool — Known Fixes (2026-07-09)**
- **Supabase RLS** — table has RLS disabled, anon key can insert freely. No policies needed.
- **File permissions** — workspace repos were owned by root. Fixed: all now owned by node:node (UID 1000). If this breaks again after a Mitch-side sync, he needs to run chown fix.

### 2026-07-19
- **Files Modified:** MEMORY.md

### 2026-07-20
- Modified `repos/render-tool/src/pages/Home.jsx`: Resolved library base image reload and project style persistence.
- Updated `memory/2026-07-19.md`.

### 2026-07-21
- Modified `render-tool` UI components (`Home.jsx`, `Library.jsx`) and styles (`App.css`, `Library.css`).
- Built distribution files for `render-tool` (`dist/` folder).
- Updated `MEMORY.md` and created nightly log for 2026-07-21.

### 2026-07-22
- **Files Modified:** `MEMORY.md`, `TOOLS.md`, `repos/render-tool/` (`App.jsx`, `App.css`, `Home.jsx`, `Library.jsx`, `Library.css`).
- **Work Summary:** Updated agent environment references. For **Render Tool**: Added "Edit / Square Up" tab with n8n integration and Library handoff, improved modal layouts, tweaked UI for cropping/spacing/cards, and added dynamic prompt preview to the Edit tab.

### 2026-07-23
- Nightly cron run at 3:00 AM UTC.
- No modifications detected in workspace repos over the past 24 hours.

### 2026-07-24
- Routine nightly memory log check.
- No source code or repo files were modified today.
- Previous day's memory consolidation is complete.

### 2026-07-25
- Nightly cron run at 3:00 AM UTC.
- No modifications detected in workspace repos over the past 24 hours.-e 
### 2026-07-26
- Nightly cron run at 3:00 AM UTC.
- No source code or repo files were modified over the past 24 hours.

### 2026-07-27
- Nightly cron run at 3:00 AM UTC.
- MEMORY.md was updated (consolidation).
- No source code or repo files were modified over the past 24 hours.

### 2026-07-28
- Nightly check: No new codebase changes in `repos/` since yesterday.
- `MEMORY.md` was last updated on 2026-07-27.

### 2026-07-29
- No daily log found or modifications recorded for this date.

### 2026-07-30
- **Workspace Updates:** Modified core identity/instructions files (`SOUL.md`, `AGENTS.md`, `MEMORY.md`) and handled various JSON templates and text patches.
- **repos/render-tool:** Modified frontend code (`src/App.jsx`, `src/pages/Home.jsx`). Created and ran scripts for n8n webhooks, workflow updates, CORS handling, and error logic.

### 2026-07-31
- Checked modified workspace files.
- Automated nightly workspace sync and memory commit.
- Executed nightly memory log task.

### 2026-08-01 (Nightly Sync)
- Modified `render-tool` (`Home.jsx`, `Library.jsx`) to add "remove from library" button to modal and update state.
- Automated nightly workspace sync and memory commit.
- Added 'Texture Creator' tab in render-tool, hooked up rt-texture-creator n8n webhook, bumped version to v1.1.5.1.

### 2026-08-02
- **Modified Files:** Various patch scripts (`patch-*.js`), `create-webhook.js`, `memory-update.js`, and Render Tool frontend files (`repos/render-tool/src/App.css`, `App.jsx`, `Home.jsx`).
- **Summary:** Applied several patches, updated texture creator logic, webhooks, and modified Render Tool styles and components.

### 2026-08-03
- Checked modified files. Only recent updates were to `MEMORY.md` and `memory/2026-08-02.md`.
- No new source files modified since the last log.

### 2026-08-04
- Modified `MEMORY.md` (updates committed earlier today)
- Automated nightly memory log routine executed
