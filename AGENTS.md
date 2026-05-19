# AGENTS.md - Codie's Workspace

## Every Session

Before doing anything:
1. Read `SOUL.md` — who you are and autonomy rules
2. Read `MEMORY.md` — project context and stack knowledge
3. Read `memory/YYYY-MM-DD.md` (today + yesterday) for recent context
4. Read `TOOLS.md` for credentials and repo locations

## Memory

- Daily notes: `memory/YYYY-MM-DD.md` — log what you did, what changed, what's in-flight
- Long-term: `MEMORY.md` — curated project knowledge, patterns, decisions

## Repo Management

Repos live at `/home/node/.openclaw/workspace/repos/`. Clone once, pull to update:

```bash
# First time
git clone https://github.com/Empowerbuilding/barnhaus-design-os.git /home/node/.openclaw/workspace/repos/barnhaus-design-os

# Every session
cd /home/node/.openclaw/workspace/repos/barnhaus-design-os && git pull
```

Always work on a branch — never commit directly to main/master:
```bash
git checkout -b codie/fix-description
```

## Git Conventions

- Branch naming: `codie/fix-something` or `codie/feature-something`
- Commit messages: conventional commits, present tense, under 72 chars
  - `fix:`, `feat:`, `chore:`, `refactor:`, `docs:`
- PRs: squash and merge unless told otherwise
- Always post the PR link in Discord when done

## Deployment

After merging to main, trigger a Coolify redeploy:
```bash
curl -s -X POST "http://142.93.29.212:8000/api/v1/deploy" \
  -H "Authorization: Bearer 1|CeoSSnjVEPF8PbBYENZoGY1SAQkrmfAgl5aDyM2Zd42fe912" \
  -H "Content-Type: application/json" \
  -d '{"uuid": "<COOLIFY_UUID>", "force": false}'
```

Coolify UUIDs per project are in MEMORY.md.

**Deploy flow (both repos):**
1. Merge PR into the deploy branch
2. Trigger redeploy via Coolify API — get back a `deployment_uuid`
3. Poll `GET /api/v1/deployments/{deployment_uuid}` every 15s until `status` is not `in_progress` (timeout after 5 min)
4. Post result in Discord:
   - ✅ `Deployed [repo] successfully — [PR link]`
   - ⚠️ `Deploy FAILED for [repo] — check Coolify: http://142.93.29.212:8000 — [PR link]`

```bash
# Trigger deploy
DEPLOY=$(curl -s -X POST "http://142.93.29.212:8000/api/v1/deploy?uuid=UUID_HERE&force=false" \
  -H "Authorization: Bearer 1|CeoSSnjVEPF8PbBYENZoGY1SAQkrmfAgl5aDyM2Zd42fe912")
DEPLOY_UUID=$(echo $DEPLOY | python3 -c "import sys,json; print(json.load(sys.stdin)['deployments'][0]['deployment_uuid'])")

# Poll status
for i in $(seq 1 20); do
  sleep 15
  STATUS=$(curl -s "http://142.93.29.212:8000/api/v1/deployments/$DEPLOY_UUID" \
    -H "Authorization: Bearer 1|CeoSSnjVEPF8PbBYENZoGY1SAQkrmfAgl5aDyM2Zd42fe912" | \
    python3 -c "import sys,json; print(json.load(sys.stdin).get('status'))")
  if [ "$STATUS" != "in_progress" ]; then break; fi
done
echo "Final status: $STATUS"
```

**Only auto-deploy trivial changes** (copy, colors, layout tweaks). For anything structural, post the PR and wait for Mitch to merge + deploy.

## Safety Rules

- Never push secrets or API keys to git
- Never touch another team's repo (only barnhaus-design-os, CRM, codie)
- Run `npm run build` or `npm run lint` before opening a PR if available
- If a command fails, read the error before retrying — don't brute-force
