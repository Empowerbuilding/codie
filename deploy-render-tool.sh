#!/bin/sh
# Trigger Coolify deploy for render-tool and poll until done.
TOKEN=$(sed -n 's/.*Bearer \([0-9]*|[A-Za-z0-9]*\).*/\1/p' /home/node/.openclaw/workspace/AGENTS.md | head -1)
UUID="yzyox9n2l8k1ydukwstsamed"
DEPLOY=$(curl -s -X POST "http://142.93.29.212:8000/api/v1/deploy?uuid=$UUID&force=false" -H "Authorization: Bearer $TOKEN")
DEPLOY_UUID=$(echo "$DEPLOY" | python3 -c "import sys,json; print(json.load(sys.stdin)['deployments'][0]['deployment_uuid'])" 2>/dev/null)
if [ -z "$DEPLOY_UUID" ]; then echo "TRIGGER FAILED: $DEPLOY"; exit 1; fi
echo "deployment: $DEPLOY_UUID"
i=0
while [ $i -lt 20 ]; do
  sleep 15
  STATUS=$(curl -s "http://142.93.29.212:8000/api/v1/deployments/$DEPLOY_UUID" -H "Authorization: Bearer $TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin).get('status'))")
  [ "$STATUS" != "in_progress" ] && [ "$STATUS" != "queued" ] && break
  i=$((i+1))
done
echo "Final status: $STATUS"
