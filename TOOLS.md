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
