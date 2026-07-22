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

When calling n8n from code or directly, these are the only valid URLs for the render tool:

| What you want to do | Full webhook URL | Payload |
|---|---|---|
| Enhance exterior image | `https://n8n.empowerbuilding.ai/webhook/rt-exterior-enhance` | `{ imageUrl, prompt }` |
| Enhance interior image | same as exterior — this workflow handles both | `{ imageUrl, prompt }` |
| Generate floor plan (2D→3D) | `https://n8n.empowerbuilding.ai/webhook/rt-floor-plan-generate` | `{ floorPlanUrl }` |
| Edit existing floor plan | `https://n8n.empowerbuilding.ai/webhook/rt-floor-plan-edit` | `{ currentFloorPlanUrl, editPrompt }` |
| Edit / Square Up (Outpaint) | `https://n8n.empowerbuilding.ai/webhook/rt-image-edit` | `{ imageUrl, targetRatio, expandDirection, prompt, profileId }` |
| Enhance a prompt | `https://n8n.empowerbuilding.ai/webhook/rt-enhance-prompt` | `{ prompt, imageUrl }` |
| Create concept card | `https://n8n.empowerbuilding.ai/webhook/rt-concept-card` | `{ ... }` |
| Video (wide) | `https://n8n.empowerbuilding.ai/webhook/rt-concept-card-video` | `{ renderUrl }` |
| Video (mobile) | `https://n8n.empowerbuilding.ai/webhook/rt-concept-card-video-mobile` | `{ renderUrl }` |
| Interior video (wide) | `https://n8n.empowerbuilding.ai/webhook/rt-interior-video` | `{ renderUrl }` |
| Interior video (mobile) | `https://n8n.empowerbuilding.ai/webhook/rt-interior-video-mobile` | `{ renderUrl }` |
| Video orchestrator step 1 | `https://n8n.empowerbuilding.ai/webhook/rt-video-orchestrator/enhance` | `{ images, format, enhancementPrompt }` |
| Video orchestrator step 2 | `https://n8n.empowerbuilding.ai/webhook/rt-video-orchestrator/generate` | pass back step 1 result |

**Never use `render-v2`, `enhance`, `exterior`, or any other invented path — they do not exist and will 404.**

### Workflow IDs (for editing workflows via API)
- RT - Exterior Image Enhancer: `up3EeeAJMwUNNrbM`
- RT - Floor Plan Generate: `x1VG7aLAgT97T5rL`
- RT - Floor Plan Edit: `FbiGsiNOzRW2O9Zc`
- RT - Prompt Enhancer: `g6ayf5ZbtxrdWkAz`
- RT - Concept Card: `qF82aTeVjiOpmJ13`
- RT - Video Orchestrator Step 1: `JfQD0kTWceG9iBPx`
- RT - Video Orchestrator Step 2: `QB4Euwhla75CNMGs`
- RT - Exterior Video: `BR34NolETCR4i0RG`
- RT - Exterior Video Mobile: `GzFmqQvviTmwIUBS`
- RT - Interior Video: `P8Atx9GzMBUFDMoq`
- RT - Interior Video Mobile: `rcSYwaFRIW8pIyku`
