# MEMORY.md - Codie's Long-Term Memory

## About Codie
- Created 2026-05-18
- Coding agent for Empower Building / Barnhaus Steel Builders
- Goal: let teammates ship small updates without needing Mitch

---

## Barnhaus Design OS

**Repo:** `Empowerbuilding/barnhaus-design-os`
**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS
**Deployed on:** Coolify — UUID: `otoevzx39emjclf9m0sfrn0d`
**Deploy branch:** `master` (not main)
**URL:** https://os.empowerbuilding.ai
**Supabase:** `nvsczfrljlovksrdyaix` — https://nvsczfrljlovksrdyaix.supabase.co
**Auto-deploy:** disabled — must trigger manually via Coolify API after merging

### What it is
The main Barnhaus app — client management, design tracking, floor plan browser (DesignVault), AI image tools. Used by Mitch and the design team day-to-day.

### Key patterns
- App Router: pages live in `app/` directory
- Components in `components/`
- Supabase client via REST API (no direct Postgres)
- Tailwind for all styling — no custom CSS files
- TypeScript strict mode

### Common tasks
- Adding/editing UI components → `components/` or inline in `app/` pages
- Updating copy or labels → search the file, edit in place
- Color/style changes → Tailwind classes, check `tailwind.config.ts` for custom colors
- New Supabase fields → update the INSERT in the relevant API route + the TypeScript type

---

## Empower CRM

**Repo:** `Empowerbuilding/CRM`
**Supabase:** `ejsnbluvkqocuchifdvp` — https://ejsnbluvkqocuchifdvp.supabase.co
**Stack:** (to be filled in after first look at the repo)

### What it is
The main CRM for Empower Building — tracks leads from Facebook ads, manages client contacts, integrates with Meta for ad feedback loop (Andromeda).

---

## Key Decisions
- Codie uses fine-grained PAT scoped to: barnhaus-design-os, CRM, codie
- Auto-deploy only for trivial changes; structural changes wait for Mitch
- Branches always prefixed `codie/`

## In-Flight Work
(update this as tasks come in and get completed)
