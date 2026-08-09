with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'r') as f:
    content = f.read()

import re
content = re.sub(r'\s*onPaste=\{\(e\) => handleUrlInputPaste\([^)]+\)\}', '', content)

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'w') as f:
    f.write(content)
