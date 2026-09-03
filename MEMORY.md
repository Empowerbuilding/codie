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

## SECTION D — RECENT SESSION NOTES (Trimmable — max 20k chars, trim entries >60 days old)

### July → 2026-08-20 rollup (condensed 2026-08-30 — full detail in git memory/*.md)
- Render Tool feature run-up: Edit/Square Up tab, Texture Creator (v1.1.5.1), 8/8 frontend overhaul + nginx.conf, view-angle presets + prompt bubbles, "Video (Animate)" tab, MaskEditor on Edit tab (maskBase64 → rt-image-edit), library Load-to-Generator + saveRender positional-args fixes, getProjectStylePrompt crash guard.
- Standing fixes: Supabase RLS disabled on render table (anon inserts freely); workspace repos must stay node:node-owned — re-chown after any Mitch-side sync; `.gitignore` ignores memory/ — daily logs need `git add -f`.
- ⚠️ STILL OPEN (needs Mitch): nightly push to `Empowerbuilding/codie` 403 — local `master` and `origin/main` share NO common ancestor; not merging autonomously.

### 2026-08-21 (condensed 2026-08-30 — full detail in git memory/2026-08-21.md)
- All-day Render Tool session w/ Michael: v1.1.7.2 → v1.2.4.5 (`7daaf23`). 2K images across 5 image workflows (`imageConfig.imageSize: "2K"`; 4K would need `gemini-3-pro-image`). All 4 Veo workflows → 1080p/8s + 4s→720p clip selector; camera-movement prompt build rewritten; audio removal via Cloudinary `ac_none,q_auto:best` (Veo rejects `generateAudio:false`).
- **Keyframe Assist shipped — now the ONLY video mode:** outpaint to clip ratio → start/end keyframes (zoom/pan/tilt = Cloudinary crops; dolly = `RT - Keyframe Next` `4qbMLXKUNcHr1k9U` / webhook `rt-keyframe-next`; orbit single-frame only) → Veo start+end. Veo constraint: lastFrame requires 1080p/8s. 9:16 outpaint/edit fixes; Library "Load to Video" feeds KeyframeAssist.
- Gotchas: n8n API-created webhook workflows need `webhookId` set manually or path never registers; read API keys from TOOLS.md at runtime; video attachments don't come through the portal.
- Open: `rt-lot-placement` unwired; interior video workflows orphaned; hidden "HQ 4K" toggle idea awaiting Michael.

### 2026-08-22 (condensed 2026-08-30 — findings locked in `RENDER-WORKFLOW-BUILD-SPEC.md`; full detail in git memory/2026-08-22.md)
- 17-round texture/edit-workflow R&D marathon with Michael; no production code. Test workflows left active: `RT - Texture Apply TEST` (`MXJ9EbgRu3P2udV6`/`rt-texture-apply-test`, optional maskUrl) and `RT - Segment Mask TEST` (`kefe537pWlMhZeNT`/`rt-segment-mask-test`); outputs in Cloudinary `home-designs/tests/` + Supabase `renders/tests/`.
- Locked rules: describe by default, swatch when exact, mask when pixel-perfect; region-guided AI edit (mask = location hint) beats PIL compositing; chained edits melt at depth 3+ → recipe stack + re-baseline. ARCHITECTURE v3: plate pass → edits max depth 2 → checkpoints/finals compose full recipe from plate.
- Doug Banks case: stacked-recipe replay 8.5 vs his melted 4-edit chain 5.5. Hard case: spatial/circulation geometry fails text + region edits (handle at compose or user-drawn masks). Dual QC spec: recipe completeness + plate-vs-final invention diff; human approval stays.

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

### 2026-08-27 → 2026-09-01 (quiet stretch, condensed 2026-09-02)
- No code changes or deploys in any repo across these days. Memory maintenance only: consolidation commits `078a068` (8/28), `582960c` + Section D trim w/ backup `MEMORY.md.bak-20260828` (8/29), `3b06018` + reorg `d60ce9b` (8/30), `40b40c7` (8/31).
- 2026-09-01: no daily log written; no repo activity. barnhaus-design-os Supabase service_role key rotated to `sb_secret_…` format in Section C (uncommitted at time of consolidation — committed 9/02).
- Carry-over unchanged: QC grader top of Studio queue; geometry outline guide spec'd; test workflows rt-texture-apply-test / rt-segment-mask-test pending cleanup; nightly push to `Empowerbuilding/codie` still blocked (403, diverged histories) awaiting Mitch.

### 2026-09-02 — Orbit keyframes: AI end frames shipped + prompt tuned (v1.2.10.1–.2)
- **Orbit now generates AI end frame (v1.2.10.1 `0372b6b`, deployed):** Michael wanted first+last frame approval for ALL camera motions; orbit was the only single-frame (Veo-driven) mode. `KeyframeAssist.jsx`: orbit-left/right type 'veo'→'ai', orbit instructions in buildKeyframePrompt, all 'veo'-type branches/UI removed; buildVideoPrompt uses "curved orbital arc" when orbit+endFrame. n8n: `RT - Exterior Video` (BR34NolETCR4i0RG) start-end prompt now conditional (orbit → curved arc, subject centered); Mobile (GzFmqQvviTmwIUBS) was MISSING the start-end rewrite entirely — brought in line incl. orbit. `rt-keyframe-next` unchanged (uses fullPrompt verbatim).
- **Orbit prompt tuning (v1.2.10.2, deployed):** initial prompt cloned start frame ~2/3 rolls. Iterated v2→v4 live against rt-keyframe-next: winning formula = name TARGET COMPOSITION ("three-quarter view, corner nearest camera") + VIEWER-relative direction ("camera moves toward the RIGHT EDGE of the current frame"). Orbit degrees now 15/35/50/70 (subtle/medium/big/huge). Still stochastic — regenerate 1-3x is expected UX; QC-grader auto-reroll is the real fix.
- **LESSON (generalizes to Studio):** image-model camera/direction instructions must be FRAME/VIEWER-relative and name the target composition, not describe the motion.
- **Key rotation fallout:** render-tool anon+service keys returned 401 on REST (legacy JWT keys likely rotated/disabled) — used n8n exec logs instead; verify keys next session. barnhaus-design-os local `lib/supabase.ts` anon key swapped to new `sb_publishable_…` format (backup `.bak-rot20260901`); verify service-role key + credential entries.
