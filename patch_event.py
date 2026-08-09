import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'r') as f:
    content = f.read()

# Insert window.dispatchEvent(new Event('libraryUpdated')); into toggleFavoriteHome where it succeeds
new_toggle_favorite = """const toggleFavoriteHome = async (imageObj, setMethod, renderType, originalImageUrl, prompt, options) => {
    if (!imageObj) return;
    if (!imageObj.id) {
      try {
        const savedDbRecord = await saveRender({ renderType, originalImageUrl, enhancedImageUrl: imageObj.url, prompt, options, metadata: { profile_id: profileId } });
        if (savedDbRecord) {
          const { error } = await supabase
            .from('renders')
            .update({ is_favorited: true })
            .eq('id', savedDbRecord.id);
          if (!error) {
            setMethod({ ...imageObj, id: savedDbRecord.id, is_favorited: true });
            window.dispatchEvent(new Event('libraryUpdated'));
          }
        }
      } catch (err) {
        console.error('Error saving and favoriting:', err);
      }
      return;
    }
    try {
      const { error } = await supabase
        .from('renders')
        .update({ is_favorited: !imageObj.is_favorited })
        .eq('id', imageObj.id);
      if (error) throw error;
      setMethod({ ...imageObj, is_favorited: !imageObj.is_favorited });
      window.dispatchEvent(new Event('libraryUpdated'));
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };"""

content = re.sub(r'const toggleFavoriteHome = async.*?};', new_toggle_favorite, content, flags=re.DOTALL)

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'w') as f:
    f.write(content)
