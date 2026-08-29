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
| Repo | Project Ref | Key Type | Service Role Key |
|---|---|---|---|
| barnhaus-design-os | `nvsczfrljlovksrdyaix` | service_role | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52c2N6ZnJsamxvdmtzcmR5YWl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODYzODQ3MywiZXhwIjoyMDk0MjE0NDczfQ.Rl8IVENc0WSpMm3d7JQzwpPV_ILp2_b6ohn1aWX-cuc` |
| CRM | `ejsnbluvkqocuchifdvp` | service_role | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqc25ibHV2a3FvY3VjaGlmZHZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjgwMTQ5NywiZXhwIjoyMDgyMzc3NDk3fQ.ZUTMAnnrwi7KPYYhkWL4Gexbn7ClrxOkG_CGWl2Q5X8` |
| render-tool | `weqooskgyaeryoekbhzi` | anon | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcW9vc2tneWFlcnlvZWtiaHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzY2ODMsImV4cCI6MjA5OTIxMjY4M30.EnQZ3gRNPDH8Nvu0OHoiQY1BevPlwwcvYRT-O9vMPmQ` |
| render-tool | `weqooskgyaeryoekbhzi` | service_role | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcW9vc2tneWFlcnlvZWtiaHppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzYzNjY4MywiZXhwIjoyMDk5MjEyNjgzfQ.xP3ZoaqYQzmp1WXRf99cioRNQ8R-mJuzxI41aBqdBB8` |

---

## SECTION D — RECENT SESSION NOTES (Trimmable — max 20k chars, trim entries >60 days old)

### July 2026 rollup (condensed 2026-08-28 — full detail in git memory/2026-07-*.md)
- Render Tool foundations: library base-image reload + project-style persistence fixes (7/20-21); "Edit / Square Up" tab + n8n integration + dynamic prompt preview (7/22); webhook/CORS/error-logic scripting (7/30).
- Known fixes that still apply: Supabase RLS disabled on render table (anon key inserts freely, no policies needed); workspace repos must be owned node:node — re-chown after any Mitch-side sync.
- Most other July nights: no repo changes, nightly cron only.

### 2026-08-01 → 08-10 rollup (condensed 2026-08-28 — full detail in git memory/2026-08-*.md)
- Texture Creator tab shipped (rt-texture-creator webhook, Gemini seamless albedo textures, v1.1.5.1); "remove from library" modal button.
- 8/8: extensive frontend overhaul — upload boxes, home sections, asset-palette masonry, exterior/interior flows, nginx.conf added; 8/9-10: Python patch tooling (convert_textarea.py, fix_paste.py, patch_library.py, patch_asset_palette.py).
- Other days: routine memory maintenance only.

### 2026-08-11 → 08-20 rollup (condensed 2026-08-28 — full detail in git memory/2026-08-*.md)
- Render Tool: view-angle in project style presets + customizable prompt bubbles (8/11); "Video (Animate)" tab replaced post-render video — Start/End toggles, camera movement, speed, format + standard upload UI (8/11); React crash on deprecated projectStyle keys fixed w/ getProjectStylePrompt safety check (8/13).
- 8/14: library "Load to Generator" fixed for remodel/texture/edit tabs; saveRender positional-args corruption bug fixed; MaskEditor component shipped on Edit/Square Up tab (draw mask → maskBase64 → rt-image-edit webhook).
- ⚠️ STILL OPEN (needs Mitch): nightly git push 403 — local `master` (45 commits) and `origin/main` (28) share NO common ancestor; not merging autonomously. `.gitignore` ignores memory/ — daily logs need `git add -f`.

### 2026-08-21
- **All-day Render Tool session with Michael** — versions v1.1.7.2 → v1.2.4.5 (last commit `7daaf23`), all deploys finished.
- **2K images:** patched 5 n8n image workflows with `generationConfig.imageConfig.imageSize: "2K"` (Exterior Enhancer, Remodel ×2, Texture Creator, Image Edit). Verified 2730×1536 output. No "Nano Banana 3" exists; 4K needs `gemini-3-pro-image`.
- **Video upgrades:** all 4 Veo workflows → 1080p (requires 8s duration); added 4s/8s Clip Length selector (4s→720p, 8s→1080p auto-paired). Camera movement was never working (hardcoded prompts, broken interpolation) — rewrote Build Veo Request in both exterior video workflows. Removed unsupported 1:1/5:4 formats. Audio removal via Cloudinary `ac_none,q_auto:best` rewrite (Veo rejects `generateAudio:false`).
- **Keyframe Assist (major feature):** new Video-tab mode — outpaint to clip ratio → derive start/end keyframes (zoom/pan/tilt = Cloudinary URL crops; dolly = new n8n workflow `RT - Keyframe Next` `4qbMLXKUNcHr1k9U` / webhook `rt-keyframe-next`; orbit = single-frame only, image models can't orbit) → Veo start+end. **Veo constraint: lastFrame requires 1080p/8s.** Now the ONLY video mode. Polish: Life & Motion chips, qualitative Move Amount, prompt previews (frontend sends `fullPrompt`, workflow uses verbatim), anti-morph + slim positive-only start-end prompt (no directional phrase, no scene description).
- **9:16 fixes:** mobile video outpaint + edit workflow now enforce `imageConfig.aspectRatio`; Edit tab has 9:16 option. Library "Load to Video" button feeds KeyframeAssist.
- **Gotchas learned:** n8n API-created webhook workflows need `webhookId` set manually or path never registers; read API keys from TOOLS.md at runtime (retyped keys get corrupted); video attachments don't come through the portal.
- **Open items:** `rt-lot-placement` webhook unwired (pre-existing, flagged); interior video workflows orphaned; TOOLS.md webhook table stale (Mitch to update); pending hidden "HQ 4K" toggle idea awaiting Michael's go.

### 2026-08-22 — Texture/workflow research marathon (17 rounds + sims, Michael driving)
- **Massive R&D day on Render Tool texture application & edit workflow** — no production code shipped; findings locked into `RENDER-WORKFLOW-BUILD-SPEC.md` (read it before building the Canvas workflow UI).
- **Test n8n workflows built (left active):** `RT - Texture Apply TEST` (`MXJ9EbgRu3P2udV6`, webhook `rt-texture-apply-test`, supports optional `maskUrl` region-guide param) and `RT - Segment Mask TEST` (`kefe537pWlMhZeNT`, webhook `rt-segment-mask-test`, Gemini binary segmentation masks). Test outputs: Cloudinary `home-designs/tests/` + Supabase `renders/tests/`.
- **Core findings:** clean base anchor beats AI-processed base; multi-swatch single-pass degrades fidelity; hybrid one-shot (text-described materials + swatches only for exact/custom) = best single pass (8.5/10). Rule: "describe by default, swatch when exact, mask when it must be pixel-perfect." Region-guided AI edit (mask as LOCATION HINT, model regenerates full frame) 9/10 — beats manual PIL compositing (shelf fallback only).
- **Melt characterization:** chained edits degrade at depth 3+ (sky = canary, gen 5 ≈ 5/10); intended edits persist, environment/sharpness melt. Fix = recipe stack + auto re-baseline (compose full recipe from plate after 2 edits).
- **FINAL ARCHITECTURE v3 (locked):** raw upload → one plate pass using production exterior-tool prompt verbatim → edits chain from plate (max depth 2) → checkpoints/finals compose full recipe from styled plate → permanent depth-2 quality ceiling. 10-step Doug-journey sim validated end-to-end (FINAL v3 8/10, warm lighting survives).
- **Real-user case (Doug Banks, profile_id=banks):** his 4-edit chain melted + inverted intent; stacked-recipe replay from clean base scored 8.5 vs his 5.5. His uploads: t8d79eoyma.png, zlcxpl0m5an.png (clean base).
- **Hard case identified:** spatial/circulation geometry (perpendicular driveway apron) fails both text and region-guided edits — handle at compose stage or via user-drawn masks. Material swaps are solved.
- **QC spec (Michael's catch):** completeness-only QC misses invented elements (unrequested wainscots, deleted foundation plinth). Build dual QC: recipe completeness + plate-vs-final invention diff; major inventions → re-roll, minor → user "keep or revert?". Human approval layer stays.
- Process note: Michael called out my earlier mistake of re-posting prior results instead of running his requested new test. Media attachments via `workspace/media-out/` confirmed working in portal.
- **Status:** research COMPLETE; next step is Canvas workflow UI build, awaiting Michael's go.

### 2026-08-23 — Workflow research rounds 18-20 concluded + STUDIO TAB v1 SHIPPED
- **Rounds 18-20 (v4-v6) with Michael, maca profile:** v4 (12-gen, pure text) FINAL 9/10 — locked production flow: plate → vision site-spec on RAW lot photo → stacked edits w/ checkpoints every 2-3 → final compose from plate. v5 proved auto region guides fix targeting errors (garage glass A/B: 9/10 vs unshippable). v6 settled selective masking: masks ONLY for small human-natural targets + user-drawn hardscape shapes; everything else text. Anti-drift color/time-of-day pins ~halve warming; residual chroma drift needs COLOR LOCK anchor (last open refinement). QC baselines must be the approved checkpoint, not the plate. Studies in `renders/tests/` (maca-workflow-study, v5-masked, v6, drawn-driveway-mask).
- **Design decisions locked (late Q&A):** masked edits store {mask, instruction, swatch} in recipe; post-compose mask replay is default; vision QC grader w/ per-op rubric + 1-2 silent re-rolls + invention-diff audit; two-verb architecture (Compose + Edit), auto re-baseline every 2-3 edits, Finalize = fresh compose + HQ upscale. UI model: Steps vs Iterations (git-like siblings from last approved, zero depth cost on rejects); ONE PRIMITIVE: generate N siblings → gate → commit. Full state in `RENDER-WORKFLOW-BUILD-SPEC.md`.
- **STUDIO TAB v1 SHIPPED:** commit `d4ea86f`, v1.2.5.1, deploy finished. New n8n prod workflow `RT - Studio Generate` (`UrPLOhwxS73njNe3`, webhook `rt-studio-generate`, ACTIVE): fullPrompt verbatim + baseImageUrl + refs + optional maskUrl → Gemini 2K → Cloudinary `home-designs/studio/`. Frontend: `src/pages/Studio.jsx` + `Studio.css`, ✦ Studio tab in Home.jsx — plate anchor, 3 labeled ref slots, sibling candidates w/ re-roll, before/after wipe, approve→recipe stack, history rail w/ branch-from-here, manual checkpoint (lights at 3 edits), MaskEditor integration, guardrails+color pins in hidden prompts, localStorage per profileId, renders saved as render_type 'studio', 3x webhook retry. v1 gaps: no auto-QC checkpoints, no vision grader, no Library→Studio handoff.
- **Ops notes:** portal quirks — remote-URL/tmp media often don't render for Michael (use media-out/ or Supabase links); his inbound image attachments don't arrive (workaround: upload via render tool, read latest Supabase renders row). rt-texture-apply-test gave occasional empty responses under load → retry loop needed. Test workflows `RT - Texture Apply TEST` + `RT - Segment Mask TEST` still active — clean up after production ships.
- Carry-over: ⚠️ nightly push to `Empowerbuilding/codie` still failing (403, diverged histories) — awaiting Mitch.

### 2026-08-24 — Studio v1.2.6.x/v1.2.7.x rapid iteration night + Meta lead form routing + Remodel realism fix
- **New Meta lead form routed (Michael):** "Qualifying Form EZZPZZ - High Intent" form_id `1379082134439027`. n8n "Facebook form to CRM" (`mzGGN4R1Cb95eSGD`) realtime trigger switched to new form (⚠️ n8n limit: ONE FB Lead Ads trigger per Meta app — old form now routed via hourly "FB Leads Catch-Up Sync" `aDgVyUyNFEB0B9ZZ`, which polls BOTH forms). Added `design_investment` qualifier to CRM metadata payload. No CRM code changes needed. Realtime on both forms would need a second Meta app (Mitch decision).
- **Studio ships (all deployed):** `2f95f9f` v1.2.6.1 (history viewer modal w/ branch-from-here + warning, paste into URL inputs, flexible label-driven ref framing, 🌿 landscaping chip); `a3ec82b` v1.2.6.2 (**COLOR LOCK solved** — checkpoint compose anchors color/WB/sky to plate not design ref; anti-melt guardrail on all edits; 🔍 full prompt inspector, fullPrompt saved to renders.options); `ff65eff` v1.2.6.3 (numbered REF 1/2/3 mapping so users can say "ref 2"; checkpoint compose auto-carries union of ALL refs used in approved steps — unchecked refs were silently dropped); `75a1fc0` v1.2.7.1 (project save/restore: 💾 save-to-Library as render_type='studio-project', auto-save on new project, 📂 open-saved-project modal; prompt inspector survives refresh); `91d9547` v1.2.7.2 (step viewer 💾 Save to Library).
- **Michael's first real Studio run (maca, 9 steps):** wainscot removal held through composes; checkpoint 7 melted but checkpoint 8 self-healed via compose-from-plate despite melted design ref (good finding). Bimodal roll behavior = model stochasticity; QC grader is the fix.
- **Remodel photorealism fix:** cartoonish remodels caused by "architectural visualization AI" prompt with no photorealism anchoring. Patched `RT - Remodel` (`OPECXhpzvymkFzAw`) with photorealism-critical block (DSLR, no CGI, material imperfections). Duplicate `7vHyMGBXFDS804oo` patched then **DEACTIVATED** (never owned the webhook, zero executions) — TOOLS.md duplicate warning now obsolete.
- **Ops:** created `workspace/deploy-render-tool.sh` (reads Coolify token from AGENTS.md at runtime — inline tokens keep getting mangled by redaction; use this for all render-tool deploys). Always read tokens from file.
- **Michael's queue for next session:** (1) dedicated Site/Lot slot w/ vision site-spec pass (top priority, needs new n8n vision workflow), (2) QC grader w/ silent checkpoint re-rolls, (3) Library→Studio load polish for studio-project entries, (4) Finalize button (fresh compose + HQ upscale), (5) more fluidity between quick actions and master guardrails. Watch for unreproduced UI glitch during double-checkpoint. Test workflows rt-texture-apply-test / rt-segment-mask-test still pending cleanup.

### 2026-08-25 — Checkpoint melt SOLVED: pure recipe replay (v1.2.7.3 → v1.2.9.2)
- **Larry's first real Studio run exposed checkpoint melt**; fixed across 5 deployed releases: `c553a1c` v1.2.7.3 (TEXTURE LOCK — unchanged areas pixel-faithful to plate), `b5dabb5` v1.2.7.4 (working image demoted to layout-only guide), `aa3f902` v1.2.7.5 (LAYOUT LOCK — pin position/orientation/footprint/scale), `7bd3467` v1.2.8.1 (**mask replay** — steps now store `maskUrl`, checkpoints composite all step masks into one region guide), `dacaa15` v1.2.9.1 (**FINAL ARCHITECTURE: pure recipe replay** — checkpoint never passes working image; new n8n vision workflow `RT - Studio Layout Spec` `KM1Tj25Nq2PbGyrc` / webhook `rt-studio-layout-spec` reads last approved image → TEXT layout spec; compose = clean plate + refs + recipe text + composited masks + spec text; spec cached per workingUrl so rerolls place identically). Michael: "a million times better... no melting."
- **v1.2.9.2 `927b4ae`:** layout-spec workflow also outputs MATERIALS & FINISHES (material/tone/grain/sheen per element) — fixed Banks' rainbow-texture drift from CG draft plates. Verified clean.
- **Banks is a CLIENT** (profile `banks`) — kitchens from SketchUp/Enscape drafts; strong prompter; best flow: draft → Remodel → output as Studio plate. 62 renders on 8/25.
- **Cost reality:** ~$0.05/step 2K gen, layout spec <$0.01 cached, heavy day ≈ $6.50; Veo video is the client cost to gate, not images.
- **Larry's project reconstructed** from renders + n8n logs → saved as studio-project `2eecca00-b40e-484f-8cc6-c466966202bc` (profile `85553075-b99e-4b57-bb82-1177bf45b228`); pre-v1.2.8.1 projects lack step maskUrls.
- **Learnings:** reroll prompts are byte-identical — variance is model stochasticity → QC grader now TOP of queue (rubric proven: texture fidelity vs plate + layout adherence vs spec). Old project snapshots = old recipe (steps approved after save correctly absent). Remaining frontier: content drift on unmasked constructive edits (fridge vanishing) → geometry outline guide + invention-diff QC, spec'd. Gotchas: n8n API-created webhook nodes need `webhookId` or route 404s; `$(...)` substitution mangles tokens under redaction — put API calls in .py files reading keys from TOOLS.md.
- Coaching: recipe text should be descriptive ("tan paver hardscape around pool"), checkpoint fully resets edit-stack degradation, don't approve bad rolls (next spec inherits their layout).

### 2026-08-26 — SMS dedupe + phone-only lead fixes; stock-plans "spam" investigation
- **Early hours:** render-tool v1.2.9.2 `927b4ae` deployed (finished) — layout-spec vision workflow emits MATERIALS & FINISHES; Banks' rainbow-texture drift confirmed fixed. Banks ref image saved `media-out/banks/ref-kitchen-uploaded.jpg`.
- **Stock Plans SMS "spam" (Michael):** claimed "Facebook form to CRM" stock-plans branch spammed custom leads (Lance Vallery, Matt Gildea, Jennifer DiVello); asked to delete SMS + HTTP Request1 nodes. **Evidence contradicted — deleted nothing:** IF routes correctly (only Phillip Brewer legitimately got store link); the three actually got "Initial outreach" SMS from separate "Outbound SMS - New Lead" (`ty4aXQa94ontsJ51`) via OLD form 1654336582197622 (lacks design-investment question). "HTTP Request1" is the CUSTOM-branch consultation email (Resend) — deleting would break good-lead follow-up. Node changes deferred to Mitch. Latent fragilities noted: Catch-Up IF cross-node pairing; SMS dedupe silently skips when contact_id missing.
- **Bill Hankins re-submission → existing-contact SMS dedupe SHIPPED:** Bill (contact 167b77d4-…, $3M+ lead since June) re-submitted FB Collect form and got day-one SMS again. Patched "Outbound SMS - New Lead" SMS Router: skip if contact already has "SMS sent: Initial outreach" activity; only marketing openers deduped, transactional sources exempt; fail-open on query error. Verified live. NOT deduped yet: consultation Resend email in "Facebook form to CRM" (fires pre-CRM, no contact_id) — optional follow-up. Also verified: Collect-form leads have Meta-side Messenger threads (`inbox_url`); any Messenger auto-messages are Meta Business Suite, not our stack (0/127 n8n workflows, 0 CRM paths use Messenger Send API).
- **Gilberto Vaz phone-only lead fix SHIPPED (CRM `18898a0`, deployed finished):** Shopify order #1120 (Bastion study set, phone-only checkout) → n8n "Shopify Order" exec errored because CRM webhook required email → contact lost. Fix in `app/api/leads/webhook/route.ts`: email optional when valid phone (≥10 digits); empty email→undefined; email dedupe skipped when absent. Replayed original webhook → contact 1b832419-… created. Note: Coolify deploy sat "queued" ~4.5 min before starting — poll longer than 5 min.
- **Carry-over queue:** QC grader (auto-score + silent reroll) top of queue awaiting go; geometry outline guide for unmasked constructive-edit drift spec'd; pre-v1.2.8.1 projects lack step maskUrls. Gotcha reconfirmed ×2: inline token substitution gets mangled — use .py scripts reading keys from TOOLS.md.

### 2026-08-27
- Quiet day — no workspace or repo changes since midnight; 2026-08-26 activity already consolidated and committed (`2d35e96` consolidation, `63ef26f` nightly log). Git tree clean, nothing in-flight.
- Carry-over unchanged: QC grader top of Studio queue awaiting go; geometry outline guide spec'd; test workflows rt-texture-apply-test / rt-segment-mask-test still pending cleanup.

### 2026-08-28
- Quiet day — only change was MEMORY.md consolidation commit `078a068` (2026-08-27 rollup). Git tree clean, no repo work or deploys in-flight.
- Carry-over unchanged: QC grader top of Studio queue; geometry outline guide spec'd; test workflows pending cleanup.
