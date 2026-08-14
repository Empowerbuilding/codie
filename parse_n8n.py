import json
import urllib.request

req = urllib.request.Request("https://n8n.empowerbuilding.ai/api/v1/workflows")
req.add_header("X-N8N-API-KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNjNkZGY4OS02ZjVlLTRmNmUtOWFhZS04YTcxMjlmMzA4ZDgiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzcyMTcwNzkwfQ.pSEf_4afOWv-ohkE59RxQr5skPTgoQRoIOYRYjqCFeo")
response = urllib.request.urlopen(req)
data = json.loads(response.read().decode('utf-8'))

for wf in data.get('data', []):
    if 'edit' in wf['name'].lower() or 'outpaint' in wf['name'].lower() or 'image' in wf['name'].lower() or 'rt' in wf['name'].lower() or 'square' in wf['name'].lower():
        print(f"ID: {wf['id']} Name: {wf['name']}")
