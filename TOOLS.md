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

### Render Tool Workflows ONLY — never touch non-RT- workflows
- RT - Exterior Image Enhancer: up3EeeAJMwUNNrbM → rt-exterior-enhance
- RT - Floor Plan Generate: x1VG7aLAgT97T5rL → rt-floor-plan-generate
- RT - Floor Plan Edit: FbiGsiNOzRW2O9Zc → rt-floor-plan-edit
- RT - Prompt Enhancer: g6ayf5ZbtxrdWkAz → rt-enhance-prompt
- RT - Concept Card: qF82aTeVjiOpmJ13 → rt-concept-card
- RT - Video Orchestrator Step 1: JfQD0kTWceG9iBPx → rt-video-orchestrator/enhance
- RT - Video Orchestrator Step 2: QB4Euwhla75CNMGs → rt-video-orchestrator/generate
- RT - Exterior Video: BR34NolETCR4i0RG → rt-concept-card-video
- RT - Exterior Video Mobile: GzFmqQvviTmwIUBS → rt-concept-card-video-mobile
- RT - Interior Video: P8Atx9GzMBUFDMoq → rt-interior-video
- RT - Interior Video Mobile: rcSYwaFRIW8pIyku → rt-interior-video-mobile
