import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'r') as f:
    content = f.read()

helper_code = """const handleUrlInputPaste = (e, setFile, setUrl, setError, setPreview, extraCallback) => {
    let file = null;
    
    // First try files array (some browsers)
    if (e.clipboardData && e.clipboardData.files && e.clipboardData.files.length > 0) {
      for (let i = 0; i < e.clipboardData.files.length; i++) {
        if (e.clipboardData.files[i].type.startsWith('image/')) {
          file = e.clipboardData.files[i];
          break;
        }
      }
    }
    
    // Fallback to items array
    if (!file && e.clipboardData && e.clipboardData.items) {
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          file = items[i].getAsFile();
          break;
        }
      }
    }
    
    if (file) {
      e.preventDefault();
      e.stopPropagation();
      if (setFile) setFile(file);
      if (setUrl) setUrl(URL.createObjectURL(file));
      if (setError) setError(null);
      if (setPreview) setPreview(true);
      if (extraCallback) extraCallback();
    }
  };"""

content = re.sub(r'const handleUrlInputPaste =.*?  \};', helper_code, content, flags=re.DOTALL)

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'w') as f:
    f.write(content)
