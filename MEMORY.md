# MEMORY.md - Codie's Long-Term Memory

## About Codie
- Created 2026-05-18, migrated to Agent Portal 2026-07-09
- Coding agent for Empower Building / Barnhaus Steel Builders
- Goal: let teammates ship updates without needing Mitch

---

## Barnhaus Design OS

**Repo:** `Empowerbuilding/barnhaus-design-os`
**Local path:** `/home/node/.openclaw/workspace/repos/barnhaus-design-os`
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS
**Coolify UUID:** `otoevzx39emjclf9m0sfrn0d`
**Deploy branch:** `master`
**URL:** https://os.empowerbuilding.ai
**Supabase ref:** `nvsczfrljlovksrdyaix`
**Portal channel:** `barnhaus-codie-design-os`

### Stack patterns
- Pages in `app/` (App Router)
- Components in `components/`
- Tailwind for all styling — no custom CSS
- Supabase via REST API (no direct Postgres)
- TypeScript strict mode

---

## Empower CRM

**Repo:** `Empowerbuilding/CRM`
**Local path:** `/home/node/.openclaw/workspace/repos/CRM`
**Stack:** Next.js, TypeScript, Tailwind CSS
**Coolify UUID:** `zcg4ko88scwc8os4s4088k00`
**Deploy branch:** `main`
**URL:** https://crm.empowerbuilding.ai
**Supabase ref:** `ejsnbluvkqocuchifdvp`
**Portal channel:** `barnhaus-codie-crm`

### What it is
Empower Building CRM — Facebook lead tracking, client contacts, Meta ad feedback loop (Andromeda).

---

## Render Tool (Image Enhancer)

**Repo:** TBD — fork of `Empowerbuilding/imageenhancer` to be set up
**URL:** https://pic.barnhaussteelbuilders.com (current prod)
**Stack:** React/Vite, pure frontend, calls n8n webhooks
**Portal channel:** `barnhaus-codie-render-tool`

---

## Supabase Keys

| Repo | Project Ref | Service Role Key |
|---|---|---|
| barnhaus-design-os | `nvsczfrljlovksrdyaix` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52c2N6ZnJsamxvdmtzcmR5YWl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODYzODQ3MywiZXhwIjoyMDk0MjE0NDczfQ.Rl8IVENc0WSpMm3d7JQzwpPV_ILp2_b6ohn1aWX-cuc` |
| CRM | `ejsnbluvkqocuchifdvp` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqc25ibHV2a3FvY3VjaGlmZHZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjgwMTQ5NywiZXhwIjoyMDgyMzc3NDk3fQ.ZUTMAnnrwi7KPYYhkWL4Gexbn7ClrxOkG_CGWl2Q5X8` |

---

## Key Decisions
- Push directly to deploy branch — no PRs, no feature branches
- Codie handles deploy trigger + monitoring after every push
- Only touch approved repos: `barnhaus-design-os`, `CRM`, `codie` (render tool TBD)
- Discord disabled — all communication via Agent Portal

## In-Flight Work
(update as tasks come in and get completed)

---

## Render Tool (Image Enhancer v2)

**Repo:** `Empowerbuilding/render-tool`
**Local path:** `/home/node/.openclaw/workspace/repos/render-tool`
**Stack:** React/Vite, TypeScript, pure frontend calling n8n webhooks
**Coolify UUID:** `yzyox9n2l8k1ydukwstsamed`
**Deploy branch:** `main`
**URL:** https://render.barnhaussteelbuilders.com (new version — do NOT touch pic.barnhaussteelbuilders.com)
**Supabase ref:** `weqooskgyaeryoekbhzi`
**Supabase URL:** https://weqooskgyaeryoekbhzi.supabase.co
**Supabase anon key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcW9vc2tneWFlcnlvZWtiaHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM2MzY2ODMsImV4cCI6MjA5OTIxMjY4M30.EnQZ3gRNPDH8Nvu0OHoiQY1BevPlwwcvYRT-O9vMPmQ
**Supabase service role:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlcW9vc2tneWFlcnlvZWtiaHppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzYzNjY4MywiZXhwIjoyMDk5MjEyNjgzfQ.xP3ZoaqYQzmp1WXRf99cioRNQ8R-mJuzxI41aBqdBB8
**DB password:** Mijopuppy2024!
**Portal channel:** `barnhaus-codie-render-tool`

### What it is
Upgraded image enhancer for Michael's team. Stores enhanced images + prompts used. Supabase `renders` table: id, created_at, render_type, original_image_url, enhanced_image_url, prompt, options (jsonb), metadata (jsonb).

### ⚠️ Important
- This is the NEW version. The original at pic.barnhaussteelbuilders.com is read-only — NEVER touch `imageenhancer` repo.
- n8n webhooks are shared with the original — same endpoints, no changes needed there.
