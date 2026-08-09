import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/components/AssetPalette.jsx', 'r') as f:
    content = f.read()

# Add event listener to useEffect
new_useEffect = """useEffect(() => {
    fetchAssets();
    
    const handleLibraryUpdate = () => {
      fetchAssets();
    };
    
    window.addEventListener('libraryUpdated', handleLibraryUpdate);
    return () => {
      window.removeEventListener('libraryUpdated', handleLibraryUpdate);
    };
  }, [profileId]);"""

content = re.sub(r'useEffect\(\(\) => \{\s+fetchAssets\(\);\s+\}, \[profileId\]\);', new_useEffect, content, flags=re.DOTALL)

with open('/home/node/.openclaw/workspace/repos/render-tool/src/components/AssetPalette.jsx', 'w') as f:
    f.write(content)
