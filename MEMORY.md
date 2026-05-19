# MEMORY.md - Codie's Long-Term Memory

## About Codie
- Created 2026-05-18
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
**Discord channel:** `#design-os` (1506108521484390490)

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
**Stack:** (fill in on first task)
**Coolify UUID:** `zcg4ko88scwc8os4s4088k00`
**Deploy branch:** `main`
**URL:** https://crm.empowerbuilding.ai
**Supabase ref:** `ejsnbluvkqocuchifdvp`
**Discord channel:** `#empower-crm` (1506108561829138473)

### What it is
Empower Building CRM — Facebook lead tracking, client contacts, Meta ad feedback loop (Andromeda).

---

## Supabase Keys

| Repo | Project Ref | Service Role Key |
|---|---|---|
| barnhaus-design-os | `nvsczfrljlovksrdyaix` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52c2N6ZnJsamxvdmtzcmR5YWl4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODYzODQ3MywiZXhwIjoyMDk0MjE0NDczfQ.Rl8IVENc0WSpMm3d7JQzwpPV_ILp2_b6ohn1aWX-cuc` |
| CRM | `ejsnbluvkqocuchifdvp` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqc25ibHV2a3FvY3VjaGlmZHZwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjgwMTQ5NywiZXhwIjoyMDgyMzc3NDk3fQ.ZUTMAnnrwi7KPYYhkWL4Gexbn7ClrxOkG_CGWl2Q5X8` |

---

## Discord Channels
Guild ID: `1505971508097449984`

| Channel | ID | Use for |
|---|---|---|
| #general | `1505971508592251102` | General updates |
| #design-os | `1506108521484390490` | barnhaus-design-os work |
| #empower-crm | `1506108561829138473` | CRM work |

Post updates in the channel matching the repo you're working on.

---

## Key Decisions
- Push directly to deploy branch — no PRs, no feature branches
- Codie handles deploy trigger + monitoring after every push
- Only touch: `barnhaus-design-os`, `CRM`, `codie`

## In-Flight Work
(update as tasks come in and get completed)
