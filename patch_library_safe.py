import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Library.jsx', 'r') as f:
    content = f.read()

# Instead of regex, let's just do a normal replace since the function is pretty standard.
target = """// Remove from the library view since it's no longer favorited
      setRenders(renders.filter(r => r.id !== id))
      
      // If the removed render is currently open in the modal, close the modal"""

replacement = """// Remove from the library view since it's no longer favorited
      setRenders(renders.filter(r => r.id !== id))
      window.dispatchEvent(new Event('libraryUpdated'))
      
      // If the removed render is currently open in the modal, close the modal"""

content = content.replace(target, replacement)

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Library.jsx', 'w') as f:
    f.write(content)
