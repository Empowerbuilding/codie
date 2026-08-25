#!/usr/bin/env python3
"""Add photorealism anchoring to both RT - Remodel workflows."""
import json, urllib.request

API = "https://n8n.empowerbuilding.ai/api/v1"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkNjNkZGY4OS02ZjVlLTRmNmUtOWFhZS04YTcxMjlmMzA4ZDgiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzcyMTcwNzkwfQ.pSEf_4afOWv-ohkE59RxQr5skPTgoQRoIOYRYjqCFeo"
IDS = ["OPECXhpzvymkFzAw", "7vHyMGBXFDS804oo"]

OLD_INTRO = "You are an expert architectural visualization AI. Your task is to remodel the first image (Base Image) based on the second image (Style Image)."
NEW_INTRO = "You are an expert photo-realistic architectural remodeling AI. Your task is to remodel the first image (Base Image) based on the second image (Style Image). The final output must be indistinguishable from a real photograph."

OLD_TAIL = "Execute the remodel strictly according to the geometry and texture instructions above."
NEW_TAIL = """PHOTOREALISM (CRITICAL - HIGHEST PRIORITY):
- The output MUST look like a real photograph captured with a professional DSLR camera. It must NOT look like a 3D render, CGI, illustration, concept art, or video game graphics.
- Preserve natural photographic lighting, true-to-life color grading, subtle photographic grain, and realistic depth of field.
- Materials must show real-world imperfections: weathering, subtle stains, texture variation. Nothing perfectly clean or uniform.
- Vegetation and landscaping must look organic and uneven — varied grass height, natural patchiness, irregular plant shapes. Never uniform, plastic, or painted-looking.
- Keep the sky, shadows, and environment photographically consistent with the Base Image.

Execute the remodel strictly according to the geometry and texture instructions above, while enforcing the photorealism requirements at all times."""

def req(method, path, body=None):
    r = urllib.request.Request(f"{API}{path}", method=method,
        headers={"X-N8N-API-KEY": KEY, "Content-Type": "application/json"},
        data=json.dumps(body).encode() if body else None)
    return json.loads(urllib.request.urlopen(r).read())

for wid in IDS:
    wf = req("GET", f"/workflows/{wid}")
    changed = False
    for n in wf["nodes"]:
        if n["type"] == "n8n-nodes-base.code" and "fullPrompt" in n.get("parameters", {}).get("jsCode", ""):
            code = n["parameters"]["jsCode"]
            if OLD_INTRO in code and OLD_TAIL in code:
                n["parameters"]["jsCode"] = code.replace(OLD_INTRO, NEW_INTRO).replace(OLD_TAIL, NEW_TAIL)
                changed = True
            elif NEW_TAIL.splitlines()[0] in code:
                print(f"{wid}: already patched, skipping")
            else:
                print(f"{wid}: WARNING prompt text not found in node {n['name']}")
    if changed:
        body = {"name": wf["name"], "nodes": wf["nodes"],
                "connections": wf["connections"], "settings": wf.get("settings", {})}
        req("PUT", f"/workflows/{wid}", body)
        print(f"{wid} ({wf['name']}): PATCHED")

# verify
for wid in IDS:
    wf = req("GET", f"/workflows/{wid}")
    for n in wf["nodes"]:
        code = n.get("parameters", {}).get("jsCode", "")
        if "fullPrompt" in code:
            ok = "PHOTOREALISM (CRITICAL" in code and "photo-realistic architectural remodeling" in code
            print(f"VERIFY {wid} ({wf['name']}): {'OK' if ok else 'FAILED'} | active={wf.get('active')}")
