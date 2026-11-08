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
🚧 **NEXT UP: Canvas workflow UI build.** Research complete (20 rounds, 2026-08-22/23). READ `/home/node/.openclaw/workspace/RENDER-WORKFLOW-BUILD-SPEC.md` FIRST — it has the locked architecture (plate → recipe stack → sibling iterations → auto-checkpoints → finalize), UI design, QC rubric, and open questions. Michael is driving this project.
⚠️ This is the NEW version. NEVER touch `imageenhancer` repo or pic.barnhaussteelbuilders.com.
n8n webhooks are shared with the original — same endpoints.
Supabase `renders` table: id, created_at, render_type, original_image_url, enhanced_image_url, prompt, options (jsonb), metadata (jsonb).
Current Version: v1.2.11.3 (safe webhook JSON parsing; video on Omni pipeline — see memory/2026-11-08.md)
Studio checkpoint architecture (LOCKED 2026-08-25): compose = clean plate + material refs + recipe text + composited step masks + TEXT layout spec from `rt-studio-layout-spec` vision workflow (`KM1Tj25Nq2PbGyrc`). NEVER pass the approved working image into a compose — that was the melt cause. Next build: QC grader (auto-score texture-vs-plate + layout-vs-spec, silent rerolls).
**Video pipeline (migrated 2026-11-08):** Google sunset Veo 3.1 preview 10-22 → all 4 RT video workflows rebuilt on Omni: webhook → Fetch Render → Gemini vision → Build Omni Request → `v1beta/interactions` (`gemini-omni-1.1-flash`, 600s timeout) → video b64 → Cloudinary `ac_none,q_auto:best`. Response shape `{"success":true,"video":...}` preserved (frontend `.video || .url`). All 4 + start-end keyframe E2E-verified 11-08 (~40-75s per video). rt-interior-video(-mobile) are API-only now — frontend interior-video code was removed as dead (commit `22ddc25`); TOOLS.md interior-video rows stale. Dec 3 2026: Omni 1.1 auto-routes to 1.2 — never hardcode.

### n8n API Ops Rules (baked in 2026-11-08 per Tony — 2nd occurrence of this bug class)
- **After ANY public-API PUT to an n8n workflow:** GET the workflow and verify the versionId CHANGED vs before the PUT, confirm the pointer resolves to a real workflow_history row (public API `/workflows/{id}/history/{versionId}` 404s on this instance → DB check via Tony), then smoke-test the webhook. A PUT that saves nodes but leaves the version pointer stale desyncs BOTH the UI editor and the runtime ("could not find workflow"). Bit us 10/30 (tony-send-email) and 11/07 (video migration).
- **PUT connections MUST be nested:** `"main": [[{...}]]`. Flat `[{...}]` saves fine but breaks instantiation ("object is not iterable" → instant 500s, no execution record).
- **Working n8n key:** `n8n_api_key.txt` line 2 (workspace root, gitignored) or `/tmp/.n8n_key`. TOOLS.md key dead since 11-07 (same user, new iat). Never put raw keys in tracked files.
- **Video webhook diagnostics:** missing `renderUrl` → instant "URL parameter must be a string, got undefined" at Fetch Render — check the payload before blaming the workflow.

---

## SECTION C — ACTIVE CLIENTS

### Supabase Keys
Keys stored locally in `memory/credentials.md` (gitignored — do not put raw keys in tracked files).
| Repo | Project Ref | Key Type |
|---|---|---|
| barnhaus-design-os | `nvsczfrljlovksrdyaix` | service_role |
| CRM | `ejsnbluvkqocuchifdvp` | service_role |
| render-tool | `weqooskgyaeryoekbhzi` | anon |
| render-tool | `weqooskgyaeryoekbhzi` | service_role |


---

## SECTION D — RECENT SESSION NOTES (Trimmable — HARD CAP 16k, condense entries older than 14 days to 1-2 lines; full detail in git history + memory/*.md)

## Rollup: July → 2026-10-17 (condensed 2026-11-08 — full detail in git history + memory/*.md)
- **July → 08-20**: Render Tool feature run-up — Edit/Square Up tab, Texture Creator, 8/8 frontend overhaul + nginx, view-angle presets, video tab
- **08-21**: All-day Render Tool session w/ Michael — v1.1.7.2 → v1.2.4.5, 2K images across 5 image workflows
- **08-22**: 17-round texture/edit-workflow R&D marathon; findings locked in RENDER-WORKFLOW-BUILD-SPEC.md
- **08-23**: Workflow research rounds 18-20 concluded + STUDIO TAB v1 SHIPPED (maca profile, vision site-spec flow)
- **08-24**: Studio v1.2.6.x/v1.2.7.x rapid iteration + Meta lead form routing (form 1379082134439027 → n8n mzGGN4R1Cb95eSGD) + Remodel realism fix
- **08-25**: Checkpoint melt SOLVED — pure recipe replay (v1.2.7.3 → v1.2.9.2), TEXTURE LOCK pixel-faithful
- **08-26**: SMS dedupe + phone-only lead fixes; stock-plans "spam" investigation; v1.2.9.2 layout-spec vision workflow (materials & finishes)
- **08-27 → 09-01**: quiet — memory maintenance only
- **09-02**: Orbit keyframes — AI end frames shipped (v1.2.10.1-.2)
- **09-03 → 09-13**: quiet — no repo commits
- **09-15 → 09-16**: Library → Studio handoff SHIPPED (v1.2.11.1)
- **09-17 → 10-01**: quiet — no repo work, deploys, or portal tasks (consolidation commits only)
- **10-02 → 10-03**: quiet — no repo/portal activity; ✅ nightly push to `Empowerbuilding/codie` RESOLVED 10-02 (July 403 / diverged-histories carry-over closed — remote master = local = `b94f651`)
- **10-04 → 10-17**: quiet — no repo work, deploys, or portal tasks; memory housekeeping only. 10-16: MEMORY.md consolidated 41.8k → 15.6k + AGENTS.md 16k hard-cap rule added (Tony applied / Mitch authorized).

### 2026-11-07
- Quiet — no repo commits, deploys, or portal tasks; MEMORY.md 15.7k (under cap), workspace clean, `memory/` still gitignored. Carry-overs: TOOLS.md n8n key dead (needs Mitch refresh); verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test n8n cleanup pending.

### 2026-11-08 (Omni video migration + full E2E — detail in memory/2026-11-08.md)
- Veo 3.1 preview sunset 10-22 killed all 4 RT video workflows → overnight migration to Omni (Interactions API, `gemini-omni-1.1-flash`); Tony verified version pointers in DB. v1.2.11.3 shipped (safe webhook parsing, commit `09900e6`). My migration script wrote FLAT connections → instant 500s; fixed via `scripts/repair_connections.py`. Backups in `backups/n8n-video-migration-20261108/` (both gitignored).
- E2E VERIFIED post-fix (real generations, ac_none mp4s, 40-75s each): exterior wide (exec 165397 + 165411), exterior mobile (165390), interior wide + interior mobile (fresh payload replays ~04:40 UTC), start-end keyframe mode (165411 — inputMode start-end, end frame from rt-keyframe-next). Five 04:04-04:05 error execs = empty-payload pings (Fetch Render URL undefined), not defects.
- RT - Analyze Style (`YuEbOkC67vVfCDTy`, rt-analyze-style, Remodel tab Analyze buttons) found INACTIVE since 09-02 01:46 with no documented reason → reactivated + smoke-tested (200 in 10s, proper description JSON).
- Open: Coolify API key dead ~03:55 11-08 — refresh before next deploy. Legacy non-RT video workflows (Exterior/Interior Video Workflow, orchestrators, prompt enhancers) still active on dead Veo — Mitch to deactivate. memory_search index broken — needs `openclaw memory index --force` on host. TOOLS.md stale (dead n8n key, veo refs, interior-video rows) — Mitch/Tony only.
- Carry-overs: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test n8n cleanup pending.
