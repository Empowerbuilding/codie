# TOOLS.md - Codie's Local Notes

## GitHub
- Org: github.com/Empowerbuilding
- Auth: GH_TOKEN env var (fine-grained PAT) — used in git remote URLs for push/pull
- Approved repos: `barnhaus-design-os`, `CRM`, `codie`

## Supabase
- Management API token: `$SUPABASE_MGMT_TOKEN` (env var)
- Use for arbitrary SQL: `POST https://api.supabase.com/v1/projects/{ref}/database/query`
- Project refs and service role keys: see MEMORY.md

## Coolify
- URL: http://142.93.29.212:8000/
- API Key: `1|CeoSSnjVEPF8PbBYENZoGY1SAQkrmfAgl5aDyM2Zd42fe912`
- Coolify UUIDs per project: see MEMORY.md

## Digital Ocean
- Server: 142.93.29.212
- Container: `codie-openclaw` (port 18794)
- Data dir: `/root/.codie`
- Restart script: `/root/restart-codie.sh`

## Agent Portal
- URL: https://portal.empowerbuilding.ai
- Channel: CRM edits → barnhaus-codie-crm
- Channel: Design OS edits → barnhaus-codie-design-os
- Channel: Render Tool edits → barnhaus-codie-render-tool
- Post updates in the channel matching the project being worked on
- Discord is disabled — portal is the only active channel

## n8n
- URL: https://n8n.empowerbuilding.ai
- API Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNjNkZGY4OS02ZjVlLTRmNmUtOWFhZS04YTcxMjlmMzA4ZDgiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzcyMTcwNzkwfQ.pSEf_4afOWv-ohkE59RxQr5skPTgoQRoIOYRYjqCFeo
- Header: X-N8N-API-KEY
- Base: https://n8n.empowerbuilding.ai/api/v1

### ⚠️ Render Tool Webhooks — USE THESE EXACT URLS. Do NOT invent webhook paths.

When calling n8n from code or directly, these are the only valid URLs for the render tool.
**Verified against the live frontend on 2026-08-16** — check `grep -rhoE "webhook/[a-zA-Z0-9/_-]+" src/` in the repo if in doubt.

**Image workflows all use `gemini-3.1-flash-image-preview`; video workflows use `veo-3.1-generate-preview`.**

| What you want to do | Full webhook URL |
|---|---|
| Enhance exterior/interior image | `https://n8n.empowerbuilding.ai/webhook/rt-exterior-enhance` |
| Remodel | `https://n8n.empowerbuilding.ai/webhook/rt-remodel` |
| Generate Texture (Albedo) | `https://n8n.empowerbuilding.ai/webhook/rt-texture-creator` |
| Edit / Square Up (Outpaint) | `https://n8n.empowerbuilding.ai/webhook/rt-image-edit` |
| Analyze style | `https://n8n.empowerbuilding.ai/webhook/rt-analyze-style` |
| Lot placement | `https://n8n.empowerbuilding.ai/webhook/rt-lot-placement` |
| Exterior video (wide) | `https://n8n.empowerbuilding.ai/webhook/rt-concept-card-video` |
| Exterior video (mobile) | `https://n8n.empowerbuilding.ai/webhook/rt-concept-card-video-mobile` |
| Interior video (wide) | `https://n8n.empowerbuilding.ai/webhook/rt-interior-video` |
| Interior video (mobile) | `https://n8n.empowerbuilding.ai/webhook/rt-interior-video-mobile` |

Payload shapes: read the calling code in `repos/render-tool/src/` — it is the source of truth.

**Deprecated — no longer called by the app (do NOT wire new features to these):** `rt-floor-plan-generate`, `rt-floor-plan-edit`, `rt-concept-card` (image), `rt-enhance-prompt`, `rt-video-orchestrator/*`.

**Never use `render-v2`, `enhance`, `exterior`, or any other invented path — they do not exist and will 404.**

### Workflow IDs (for editing workflows via API)
- RT - Exterior Image Enhancer: `up3EeeAJMwUNNrbM`
- RT - Remodel: `OPECXhpzvymkFzAw` (⚠️ duplicate also active: `7vHyMGBXFDS804oo`)
- RT - Texture Creator: `F1FjqvnaitpUDPRe`
- RT - Image Edit / Outpaint: `8XLUwv88etraqHtR`
- RT - Analyze Style: `YuEbOkC67vVfCDTy`
- RT - Exterior Video: `BR34NolETCR4i0RG`
- RT - Exterior Video Mobile: `GzFmqQvviTmwIUBS`
- RT - Interior Video: `P8Atx9GzMBUFDMoq`
- RT - Interior Video Mobile: `rcSYwaFRIW8pIyku`
- (Deprecated: Floor Plan Generate `x1VG7aLAgT97T5rL`, Floor Plan Edit `FbiGsiNOzRW2O9Zc`, Prompt Enhancer `g6ayf5ZbtxrdWkAz`, Concept Card `qF82aTeVjiOpmJ13`, Video Orchestrator `JfQD0kTWceG9iBPx`/`QB4Euwhla75CNMGs`)
