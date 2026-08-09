import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/components/AssetPalette.jsx', 'r') as f:
    content = f.read()

print("is_favorited" in content)
