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
Current Version: v1.2.9.1 (Studio pure-recipe-replay checkpoints — see memory/2026-08-25.md)
Studio checkpoint architecture (LOCKED 2026-08-25): compose = clean plate + material refs + recipe text + composited step masks + TEXT layout spec from `rt-studio-layout-spec` vision workflow (`KM1Tj25Nq2PbGyrc`). NEVER pass the approved working image into a compose — that was the melt cause. Next build: QC grader (auto-score texture-vs-plate + layout-vs-spec, silent rerolls).

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

## Rollup: July → 2026-10-01 (condensed 2026-10-16 — full detail in git history + git memory/*.md)
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

### 2026-10-02 (consolidated 2026-10-03)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (last repo commits: render-tool 09-15, CRM 08-26, barnhaus 07-02). Only activity on 10-01: MEMORY.md consolidation commit `b94f651` + nightly log; working tree clean. Nothing in-flight.
- ✅ **Nightly push to `Empowerbuilding/codie` RESOLVED** (was 403 / diverged histories, awaiting Mitch since July): remote master = local = `b94f651` — the Oct 1 consolidation commit reached GitHub. Carry-over closed; marked resolved in the July→Aug-20 rollup above.
- MEMORY.md ~30.5k chars (>20k cap); still no Section D entries past the 60-day window (oldest rollup ends 2026-08-20) — natural trimming starts ~Oct 19 when that rollup ages out.
- Carry-overs (push item dropped): verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending.

### 2026-10-03 (consolidated 2026-10-04)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (last repo commits: render-tool 09-15, CRM 08-26, barnhaus 07-02). Only activity on 10-02: MEMORY.md consolidation commit `853aa01` + nightly log; working tree clean. Nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md ~32k chars (>20k cap) — Section D 60-day trimming starts ~Oct 19 when the July→Aug-20 rollup ages out.

### 2026-10-04 (consolidated 2026-10-05)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (last repo commits: render-tool 09-15, CRM 08-26, barnhaus 07-02). Only activity Oct 3: 13:04 UTC consolidation commit `2f1fd4b` (added "### 2026-10-02" section; marked nightly-push carry-over resolved in July→Aug-20 rollup); the Oct-4 13:00 UTC consolidation `7cd4620` followed after the nightly log. Working tree clean; nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md ~33.5k chars (>20k cap) — Section D 60-day trimming starts ~Oct 19 when the July→Aug-20 rollup ages out.

### 2026-10-05 (consolidated 2026-10-06)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (last repo commits: render-tool 09-15, CRM 08-26, barnhaus 07-02). Only activity Oct 4: 13:03 UTC consolidation commit `7cd4620` (added "### 2026-10-03" section) + nightly log; working tree clean at log time. Nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md ~34k chars (>20k cap) — Section D 60-day trimming starts ~Oct 19 when the July→Aug-20 rollup ages out.

### 2026-10-06 (consolidated 2026-10-07)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (last repo commits: render-tool 09-15, CRM 08-26, barnhaus 07-02). Only activity Oct 5: consolidation commit + nightly log; working tree clean at log time. Nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md >20k cap — Section D 60-day trimming starts ~Oct 19 when the July→Aug-20 rollup ages out.

### 2026-10-07 (consolidated 2026-10-08)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (last repo commits: render-tool 09-15, CRM 08-26, barnhaus 07-02). Working tree clean at log time; nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md >20k cap — no Section D entries older than 60 days yet (oldest rollup extends to 2026-08-20); natural trimming starts ~Oct 19.

### 2026-10-08 (consolidated 2026-10-09)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (repo heads unchanged: render-tool `04578f5` 09-15, CRM `18898a0` 08-26, barnhaus `804cf73` 07-02). Only activity: memory housekeeping — Oct 7 consolidation `9f6d325` (per nightly log) + Oct 8 consolidation `c84b3c9`. Nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md >20k cap — Section D 60-day trimming starts ~Oct 19 when the July→Aug-20 rollup ages out.

### 2026-10-09 (consolidated 2026-10-10)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (repo heads unchanged: render-tool `04578f5` 09-15, CRM `18898a0` 08-26, barnhaus `804cf73` 07-02). Only activity: memory housekeeping — Oct 8 consolidation `c84b3c9` (2026-10-07 section) + memory/2026-10-08.md nightly log. Nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md >20k cap — Section D 60-day trimming starts ~Oct 19 when the July→Aug-20 rollup ages out.

### 2026-10-10 (consolidated 2026-10-11)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (repo heads unchanged: render-tool `04578f5` 09-15, CRM `18898a0` 08-26, barnhaus `804cf73` 07-02). Only activity: memory housekeeping — Oct 9 consolidation `484e20a` (added 2026-10-08 section) + memory/2026-10-09.md nightly log. Nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md ~36.8k chars (>20k cap) — Section D 60-day trimming starts ~Oct 19 when the July→Aug-20 rollup ages out.

### 2026-10-11 (consolidated 2026-10-12)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (repo heads unchanged: render-tool `04578f5` 09-15, CRM `18898a0` 08-26, barnhaus `804cf73` 07-02). Only activity: memory housekeeping — Oct 10 consolidation `a037062` (added 2026-10-09 section) + memory/2026-10-10.md nightly log. Nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md ~37.5k chars (>20k cap) — no Section D entries older than 60 days yet; trimming starts ~Oct 19 when the July→Aug-20 rollup ages out.

### 2026-10-12 (consolidated 2026-10-13)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (repo heads unchanged: render-tool `04578f5` 09-15, CRM `18898a0` 08-26, barnhaus `804cf73` 07-02). No files modified in prior 24h; working tree clean at nightly log time. Nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md ~37.5k chars (>20k cap) — Section D 60-day trim window opens ~Oct 19 when the July→Aug-20 rollup fully ages out (60-day cutoff today is Aug 14; rollup still holds Aug 14–20 content).

### 2026-10-13 (consolidated 2026-10-14)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (repo heads unchanged: render-tool `04578f5` 09-15, CRM `18898a0` 08-26, barnhaus `804cf73` 07-02). No files modified in prior 24h; working tree clean at nightly log time. Nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md ~38.9k chars (>20k cap) — Section D 60-day trim window opens ~Oct 19 when the July→Aug-20 rollup fully ages out (60-day cutoff today is Aug 15; rollup still holds Aug 15–20 content).

### 2026-10-14 (consolidated 2026-10-15)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (repo heads unchanged: render-tool `04578f5` 09-15, CRM `18898a0` 08-26, barnhaus `804cf73` 07-02). No files modified in prior 24h; working tree clean at nightly log time. Nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md ~39.7k chars (>20k cap) — no Section D entries older than 60 days yet (60-day cutoff today is Aug 16; July→Aug-20 rollup still holds Aug 16–20 content) — trim window opens ~Oct 19.

### 2026-10-15 (consolidated 2026-10-16)
- Quiet day: no repo work, no deploys, no portal tasks in CRM, barnhaus-design-os, or render-tool (repo heads unchanged: render-tool `04578f5` 09-15, CRM `18898a0` 08-26, barnhaus `804cf73` 07-02). Only activity: 13:00 UTC consolidation commit (added 2026-10-13 section) + memory/2026-10-15.md nightly log. Working tree clean at log time; nothing in-flight.
- Carry-overs unchanged: verify render-tool + MEMORY.md Supabase keys post-rotation (Sept 2); QC grader top of Studio queue; rt-texture-apply-test / rt-segment-mask-test cleanup pending; MEMORY.md ~40.4k chars (>20k cap) — 60-day cutoff today is Aug 17; July→Aug-20 rollup still holds Aug 17–20 content — Section D trim window opens ~Oct 19.
