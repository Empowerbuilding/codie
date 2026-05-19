# AGENTS.md - Codie's Workspace

## Every Session

1. Read `SOUL.md` — who you are and autonomy rules
2. Read `MEMORY.md` — project context and stack knowledge
3. Read `memory/YYYY-MM-DD.md` (today + yesterday) for recent context
4. Read `TOOLS.md` for credentials

## Memory

- Daily: `memory/YYYY-MM-DD.md` — log what you did, what changed, what's in-flight
- Long-term: `MEMORY.md` — curated project knowledge, patterns, decisions

## Repos

Repos live at `/home/node/.openclaw/workspace/repos/`. Clone once, pull each session:

```bash
# Clone (first time only)
git clone https://github.com/Empowerbuilding/barnhaus-design-os.git \
  /home/node/.openclaw/workspace/repos/barnhaus-design-os

git clone https://github.com/Empowerbuilding/CRM.git \
  /home/node/.openclaw/workspace/repos/CRM

# Every session — pull before making changes
cd /home/node/.openclaw/workspace/repos/<repo> && git pull
```

## Git

- Commit directly to the deploy branch — no feature branches, no PRs
- `barnhaus-design-os` → deploy branch: `master`
- `CRM` → deploy branch: `main`
- Commit format: `fix:`, `feat:`, `chore:`, `refactor:`, `docs:` — present tense, under 72 chars
- Git is pre-configured with credentials — just `git push origin <branch>`

## Deploy Flow

After pushing, trigger Coolify and monitor:

```bash
# 1. Trigger deploy (get COOLIFY_UUID from MEMORY.md)
DEPLOY=$(curl -s -X POST "http://142.93.29.212:8000/api/v1/deploy?uuid=COOLIFY_UUID&force=false" \
  -H "Authorization: Bearer 1|CeoSSnjVEPF8PbBYENZoGY1SAQkrmfAgl5aDyM2Zd42fe912")
DEPLOY_UUID=$(echo $DEPLOY | python3 -c "import sys,json; print(json.load(sys.stdin)['deployments'][0]['deployment_uuid'])")

# 2. Poll until done (max 5 min)
for i in $(seq 1 20); do
  sleep 15
  STATUS=$(curl -s "http://142.93.29.212:8000/api/v1/deployments/$DEPLOY_UUID" \
    -H "Authorization: Bearer 1|CeoSSnjVEPF8PbBYENZoGY1SAQkrmfAgl5aDyM2Zd42fe912" | \
    python3 -c "import sys,json; print(json.load(sys.stdin).get('status'))")
  if [ "$STATUS" != "in_progress" ]; then break; fi
done
```

- ✅ Post in the repo's Discord channel: `Deployed [commit msg] to [repo]`
- ⚠️ Post: `Deploy FAILED for [repo] — check Coolify: http://142.93.29.212:8000`

## Database Queries

Use the Supabase Management API for any SQL. Token is `$SUPABASE_MGMT_TOKEN` (env var).

```bash
curl -s -X POST "https://api.supabase.com/v1/projects/PROJECT_REF/database/query" \
  -H "Authorization: Bearer $SUPABASE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "SELECT * FROM contacts LIMIT 10;"}'
```

Repo → database mapping is in MEMORY.md.

**Rules:**
- `SELECT`: run freely, show results in Discord
- `INSERT` / `UPDATE`: confirm with requester first
- `DELETE` / schema changes: Mitch approval only
- Never post sensitive data (emails, phones) in Discord — summarize

## Safety

- Never push secrets or keys to git
- Only touch approved repos: `barnhaus-design-os`, `CRM`, `codie`
- If a command fails, read the error before retrying
- **Do NOT run `npm install` or `npm run build`** inside the container — these are slow and not needed. Just push the code change and let Coolify build it.
