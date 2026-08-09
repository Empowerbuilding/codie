import re
import sys

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'r') as f:
    content = f.read()

# 1. Insert handlePasteClick helper
helper_code = """
  const handlePasteClick = async (setFile, setUrl, setError, setPreview, extraCallback) => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        if (clipboardItem.types.some(type => type.startsWith('image/'))) {
          const blob = await clipboardItem.getType(clipboardItem.types.find(type => type.startsWith('image/')));
          const file = new File([blob], 'pasted_image.png', { type: blob.type });
          if (setFile) setFile(file);
          if (setUrl) setUrl(URL.createObjectURL(file));
          if (setError) setError(null);
          if (setPreview) setPreview(true);
          if (extraCallback) extraCallback();
          return;
        }
      }
      if (setError) setError("No image found on clipboard.");
    } catch (err) {
      console.error("Clipboard read failed:", err);
      if (setError) setError("Clipboard access denied. Please use Ctrl+V.");
    }
  };
"""
# Insert right after `const handleCloseLibraryModal = () => { ... }` or some other known location inside Home component
if "const handlePasteClick" not in content:
    content = content.replace("const [showLibraryModal, setShowLibraryModal] = useState(false);", 
                              "const [showLibraryModal, setShowLibraryModal] = useState(false);\n" + helper_code)

# 2. Patch the HTML
def get_replacement(match):
    original = match.group(0)
    
    # Change "Upload or Paste Image" to "Upload Image"
    new_html = original.replace("Upload or Paste Image", "Upload Image")
    
    # Change flex styles on the group and the label
    new_html = new_html.replace('className="file-upload-group"', 'className="file-upload-group" style={{ display: \'flex\', gap: \'1rem\' }}')
    new_html = new_html.replace('minHeight: \'120px\' }', 'minHeight: \'120px\', flex: 1 }')
    
    # Determine which setter functions to pass based on context
    paste_call = ""
    if "handleTextureFileUpload" in original:
        paste_call = "() => handlePasteClick(setTextureImageFile, setTextureImageUrl, setTextureError)"
    elif "setExteriorImageFile" in original:
        paste_call = "() => handlePasteClick(setExteriorImageFile, setExteriorImageUrl, setExteriorError, setexteriorShowPreview)"
    elif "setInteriorImageFile" in original:
        paste_call = "() => handlePasteClick(setInteriorImageFile, setInteriorImageUrl, setInteriorError, setinteriorShowPreview)"
    elif "setEditImageFile" in original:
        paste_call = "() => handlePasteClick(setEditImageFile, setEditImageUrl, setEditError, seteditShowPreview, () => setEditEnhancedImage(null))"
    elif "handleRemodelBaseFileUpload" in original:
        paste_call = "() => handlePasteClick(setRemodelBaseImageFile, setRemodelBaseImageUrl, setRemodelBaseError)"
    elif "handleRemodelStyleFileUpload" in original:
        paste_call = "() => handlePasteClick(setRemodelStyleImageFile, setRemodelStyleImageUrl, setRemodelStyleError)"
    else:
        # fallback
        paste_call = "() => alert('Not implemented')"
    
    paste_button = f"""
                    <button
                      type="button"
                      className="file-upload-btn paste-btn"
                      style={{{{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px', flex: 1, backgroundColor: 'transparent', border: '2px dashed #444', color: '#888', cursor: 'pointer' }}}}
                      onClick={{{paste_call}}}
                    >
                      <span style={{{{ fontSize: '2rem', marginBottom: '0.5rem' }}}}>📋</span>
                      Paste Image
                    </button>
"""
    # Insert the button right after the </label>
    return new_html.replace("</label>", "</label>\n" + paste_button)

# Find all <div className="file-upload-group">...</div> blocks that contain "Upload or Paste Image"
import re
pattern = re.compile(r'<div className="file-upload-group">.*?Upload or Paste Image.*?</label>', re.DOTALL)
content = pattern.sub(get_replacement, content)

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'w') as f:
    f.write(content)

print("Patched!")
