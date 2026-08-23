# Render Tool — Canvas Workflow BUILD SPEC
**Status: RESEARCH COMPLETE (20 experiment rounds, 2026-08-22/23). Next phase: build the UI.**
Read this + MEMORY.md Section B before doing any build work. Full experiment history in `memory/2026-08-22.md` and `memory/2026-08-23.md`.

---

## 1. What we're building
A checkpoint/recipe-based iterative design workflow for the Render Tool: user uploads a raw render/photo, gets a styled "plate," then stacks edits (materials, elements, lot, landscaping, driveway) with approval gates — without AI degradation ("melt") ever compounding.

## 2. Proven architecture (locked, v6-final)
1. **Plate pass** — raw upload → ONE styled render using the exterior tool's production prompt verbatim. The plate is the permanent anchor; camera never changes. (2K, `gemini-3.1-flash-image-preview` via n8n.)
2. **Edits chain from the working image, max depth 2-3** between checkpoints. Melt is a function of chain DEPTH, not step count. Sky degradation = the canary.
3. **Checkpoint = fresh one-shot compose from the PLATE** with the full accumulated recipe (text) + approved image as style reference. Resets depth. Erases melt completely.
4. **Finalize = fresh compose + HQ upscale.** Always 1-2 gens deep. Client deliverable.
5. **Recipe stack** = ordered list of approved ops `{type, instruction, mask?, swatchUrl?, approvedImageUrl}`. This is the durable artifact; images are disposable, the recipe is not.

## 3. Edit targeting rules (proven)
- **"Describe by default, swatch when exact, mask when it must be pixel-perfect."**
- Text direction beats swatches for common materials (standing seam, cedar, etc.). Swatches only for custom/exact materials. Hybrid one-shot (text + swatch mixed) scored 8.5-9/10.
- **Auto region guides (soft mask as LOCATION HINT, Edit-tab maskBase64 style) by default for fuzzy categories** — doors/windows/trim. A/B proven: garage door edit with guide = 9/10 glass preserved; without = slats over glass walls (unshippable). NOT manual pixel compositing — mask is a hint, model regenerates full frame (round 10: 9/10 vs 5.5/10 composite).
- **User-DRAWN masks** for spatial/circulation geometry (driveways, hardscape) — model's weakest muscle is spatial layout from text (round 17: both text + region attempts failed on perpendicular driveway). MaskEditor component already exists in repo.
- **Per-edit guardrails in prompt:** protected-elements list (glazing, roof, lighting), explicit color-grade/time-of-day pin ("maintain exact color grade and time of day"), anti-morph language. Pins cut warm drift ~50%.
- Masks stay valid across all checkpoints because plate camera is fixed. Masked edits replay POST-compose by default (compose bakes text edits, then masked edits re-applied on fresh compose = depth 3, under ceiling). 1-2 masks max can go in-compose as labeled region-guide inputs.
- Lot/site injection: vision pass on RAW site photo (never AI-enhanced) → text site spec → include in compose.

## 4. QC layer (dual audit, every gen)
- **Completeness:** per-op rubric (material swap → swatch fidelity + confinement; compose → element-by-element recipe checklist; edit → "everything else identical").
- **Invention diff:** "list any unrequested additions/alterations/DELETIONS" vs baseline. Catches invented wainscots, deleted foundation plinth (both slipped past completeness-only QC — Michael caught them by eye).
- **Baseline for audits = the approved checkpoint, NOT the original plate** (round 20 lesson — auditor framing matters).
- Threshold gate: 1-2 silent re-rolls on fail; fail twice → surface best attempts to user + suggest mask/reword.
- Inventions: major (geometry/element changes) → re-roll or flag; minor → "keep or revert?" user choice (drift can be a feature).

## 5. UI design (agreed 2026-08-23 ~04:10-04:20 UTC)
**Core model — Steps vs Iterations (git-like):**
- Step = one intent. Iteration = one generation attempt at that step.
- **Iterations are SIBLINGS, not a chain** — every iteration generates from the last approved image, never from a rejected sibling. Rejected gens cost zero depth. This is the melt-safety foundation.
- Approve → iteration image becomes working image + step op committed to recipe stack. Rejected iterations → collapsed history (viewable/restorable, inert).
- User is HELD at the current step until approve (same as video flow).

**Layout:**
- **Recipe rail** (filmstrip): committed steps in order — thumbnail + label ("Roof → black tile"). Checkpoints = subtle markers. Click step = see the request.
- **Working stage:** big image = latest iteration; sibling thumbnails below for compare/pick; controls = ✓ Approve / ↻ Re-roll / ✎ Revise (edit prompt or draw mask → new sibling).

**Checkpoints — automatic, mostly invisible:**
- Depth counter; after 2 approved edits → silent compose from plate + QC.
- QC pass → swap in silently (optional small toast — Michael hasn't decided silent vs toast yet, OPEN QUESTION).
- QC fail after 2-3 silent re-rolls → non-blocking "Quality refresh needs your eye" card, best 2-3 candidates side-by-side, pick or skip. Skip = defer, retry after next approved edit. NEVER block the user.
- Manual "Lock checkpoint" button → sets QC baseline.
- **Checkpoints ARE iterations too** (Michael confirmed) — same primitive, system is the first reviewer.

**One primitive everywhere:** generate N siblings → gate → commit. Gate = QC grader (auto-checkpoints), user (steps/manual checkpoints/finalize), or QC-then-user fallback. Build ONE iteration/approval component + ONE recipe-commit path, reuse everywhere. Checkpoints are steps authored by "system."
- Finalize is ALWAYS a human gate, never silent.

## 6. Backend / infra notes
- Test n8n workflows (active, promote or rebuild for production):
  - `RT - Texture Apply TEST` — id `MXJ9EbgRu3P2udV6`, webhook `rt-texture-apply-test`. Accepts base + labeled swatches `{textures:[{slot,url}]}` + optional `maskUrl` region-guide param.
  - `RT - Segment Mask TEST` — id `kefe537pWlMhZeNT`, webhook `rt-segment-mask-test`. Gemini binary segmentation mask for a named element.
  - `RT - Keyframe Next` — id `4qbMLXKUNcHr1k9U`, webhook `rt-keyframe-next` (video keyframes, already production).
- Occasional empty responses from rt-texture-apply-test under load → production needs retry loop.
- n8n API-created webhook workflows need `webhookId` set manually or the path never registers.
- 2K via `generationConfig.imageConfig.imageSize: "2K"`; 4K would need `gemini-3-pro-image`.
- Test artifacts: Cloudinary `home-designs/tests/`, Supabase `renders/tests/` (study sheets: doug-workflow-study, -v2, -v3, maca-workflow-study, maca-v5-masked-study, maca-v6-study). Clean up only after production ships.

## 7. Open items before/during build
- Silent checkpoint swap vs. toast notification — Michael to decide.
- Color-lock anchor for environment swaps (residual warm drift concentrated in lot-placement step) — last open quality refinement. Ideas: material hex anchors, approved-checkpoint as color reference.
- Drawn-hardscape abutment detail still soft (6.5/10).
- Interior video workflows orphaned; `rt-lot-placement` webhook unwired (pre-existing).
- Raw site photos ONLY for lot injection (AI-enhanced lot images → funky trees).
- Waiting on: formal go-ahead to build production UI in `render-tool` repo (Michael driving; per SOUL.md large multi-file build may need Mitch sign-off — Michael has been directing this project throughout).

## 8. Key experiment scores (for reference)
Hybrid one-shot 8.5-9 · region-guided edit 9 · clean-base swatch 8 · recipe-recovery 7.5 · masked composite 7 (zero-drift fallback only) · approved-ref one-shot 6 (camera drift — recipe-recovery/onboarding only). FINAL v4 9/10 (best), v5 8.5 w/ auto-guides, v6 validated selective-mask + drawn driveway + anti-drift pins. Safe edit budget between checkpoints: 2-3.
