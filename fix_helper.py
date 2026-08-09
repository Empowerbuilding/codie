import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'r') as f:
    content = f.read()

helper_code = """
  const handleUrlInputPaste = (e, setFile, setUrl, setError, setPreview, extraCallback) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (setFile) setFile(file);
        if (setUrl) setUrl(URL.createObjectURL(file));
        if (setError) setError(null);
        if (setPreview) setPreview(true);
        if (extraCallback) extraCallback();
        return;
      }
    }
  };
"""

if "const handleUrlInputPaste" not in content:
    content = content.replace("const [showLibraryModal, setShowLibraryModal] = useState(false);", 
                              "const [showLibraryModal, setShowLibraryModal] = useState(false);\n" + helper_code)

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'w') as f:
    f.write(content)
