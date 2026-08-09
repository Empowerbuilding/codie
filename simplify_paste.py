import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'r') as f:
    content = f.read()

# 1. Remove the line: if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
content = content.replace("if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;", "")

# 2. Remove handleUrlInputPaste function definition
content = re.sub(r'const handleUrlInputPaste =.*?  \};\n\n', '', content, flags=re.DOTALL)

# 3. Change input type="url" back to type="text" just in case they prefer it
content = content.replace('type="url"', 'type="text"')

# 4. Remove onPaste from the url inputs
content = re.sub(r'\s*onPaste=\{\(e\) => handleUrlInputPaste\([^)]+\)\}', '', content)

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'w') as f:
    f.write(content)
