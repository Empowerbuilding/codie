import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'r') as f:
    content = f.read()

# We need to find the <div className="file-upload-group"> and the label inside it, then append the button.
# Note: we should look at exactly how it's formatted.

def replacer(match):
    prefix = match.group(1) # up to <div className="file-upload-group">
    
    # Extract what setter functions we need to call based on the onChange of the input inside
    file_upload_group = match.group(0)
    
    set_file_match = re.search(r'set([A-Za-z]+Image)File\s*\(\s*file\s*\)', file_upload_group)
    if not set_file_match:
        set_file_match = re.search(r'set([A-Za-z]+)File\s*\(\s*file\s*\)', file_upload_group)
    
    # Let's try a different approach: manually patch each instance since there are only 6, 
    # but programmatically finding them is safer.
    return match.group(0)

# Let's just do it manually with Python string replacement for the 6 specific blocks.
