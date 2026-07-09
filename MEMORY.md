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
