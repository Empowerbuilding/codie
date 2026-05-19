# TOOLS.md - Codie's Local Notes

## GitHub
- Org: github.com/Empowerbuilding
- `gh` CLI authenticated with fine-grained PAT (stored as `$GH_TOKEN` env var)
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

## Discord
- Guild ID: `1505971508097449984`
- Channel IDs: see MEMORY.md
- Bot token: stored in `/root/.codie/openclaw.json` on DO server
