import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'r') as f:
    content = f.read()

# Let's completely replace handleUrlInputPaste to be more robust.
helper_code = """const handleUrlInputPaste = (e, setFile, setUrl, setError, setPreview, extraCallback) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    
    let hasImage = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        hasImage = true;
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
  };"""

content = re.sub(r'const handleUrlInputPaste =.*?  \};', helper_code, content, flags=re.DOTALL)

# Let's also restore the global onPaste to the big DIV containers in case the user isn't focused on the URL input.
# In the original file before my changes, there were `onPaste={(e) => { ... }}` handlers on the wrapping `div` elements like `<div className="upload-container" ...>` or similar, but the user said "pasting into the url text box is not working with the image itself".

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'w') as f:
    f.write(content)
