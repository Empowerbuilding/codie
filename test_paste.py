import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'r') as f:
    content = f.read()

# Let's see if the input fields still have the handleUrlInputPaste logic
import sys
for match in re.finditer(r'<input\s+type="url"[^>]*?>', content):
    print(match.group(0))
