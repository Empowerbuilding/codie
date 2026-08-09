import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/components/AssetPalette.jsx', 'r') as f:
    content = f.read()

# Add .eq('is_favorited', true) to fetchAssets in AssetPalette to match the main Library
new_query = """let query = supabase
        .from('renders')
        .select('*')
        .eq('is_favorited', true)
        .order('created_at', { ascending: false })
        .limit(100);"""

content = re.sub(r"let query = supabase\s*\.from\('renders'\)\s*\.select\('\*'\)\s*\.order\('created_at', \{ ascending: false \}\)\s*\.limit\(100\);", new_query, content)

with open('/home/node/.openclaw/workspace/repos/render-tool/src/components/AssetPalette.jsx', 'w') as f:
    f.write(content)
