# TOOLS.md - Codie's Local Notes

## GitHub
- Org: github.com/Empowerbuilding
- CLI (`gh`) authenticated with fine-grained PAT (stored in restart-codie.sh on DO server)
- Scoped repos: barnhaus-design-os, codie, CRM (+ any others granted at token creation)
- Personal repo: https://github.com/Empowerbuilding/codie

## Supabase SQL Access
Direct Postgres is blocked — use the pooler on port 6543.

```bash
# Design OS
psql "postgresql://postgres.nvsczfrljlovksrdyaix:Mijopuppy2024!@aws-0-us-east-1.pooler.supabase.com:6543/postgres"

# Empower CRM
psql "postgresql://postgres.ejsnbluvkqocuchifdvp:Mijopuppy2024!@aws-0-us-east-1.pooler.supabase.com:6543/postgres"
```

Or run a one-liner:
```bash
psql "<connection_string>" -c "SELECT * FROM table LIMIT 10;"
```

## Barnhaus Design OS
- Repo: https://github.com/Empowerbuilding/barnhaus-design-os.git
- Path: `../barnhaus-design-os/`
- Supabase URL: https://nvsczfrljlovksrdyaix.supabase.co
- Supabase Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52c2N6ZnJsamxvdmtzcmR5YWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2Mzg0NzMsImV4cCI6MjA5NDIxNDQ3M30.755-ZtOXLpg4lnZAGuFhcd4ORUZSmvq7gKjXsx0rDaM

## Empower CRM
- Repo: https://github.com/Empowerbuilding/CRM
- The main Empower Building CRM — Meta ads integration, lead management
- Supabase URL: https://ejsnbluvkqocuchifdvp.supabase.co

## Coolify
- URL: http://142.93.29.212:8000/
- API Key: 1|CeoSSnjVEPF8PbBYENZoGY1SAQkrmfAgl5aDyM2Zd42fe912

## Digital Ocean
- SSH: root@142.93.29.212 (key-based)
- Container: codie-openclaw (port 18794)
- Data dir: /root/.codie
- Restart script: /root/restart-codie.sh

## Discord
- Token: (stored in /root/.codie/openclaw.json on DO server)
- Guild ID: 1505971508097449984
- Channel ID: 1505971508592251102 (#coding-agent)
