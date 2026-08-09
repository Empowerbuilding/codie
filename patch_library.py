import re

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Library.jsx', 'r') as f:
    content = f.read()

new_toggle_favorite = """const toggleFavorite = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('renders')
        .update({ is_favorited: !currentStatus })
        .eq('id', id)
      
      if (error) throw error
      
      // Remove from the library view since it's no longer favorited
      setRenders(renders.filter(r => r.id !== id))
      window.dispatchEvent(new Event('libraryUpdated'))
      
      // If the removed render is currently open in the modal, close the modal
      if (selectedRender && selectedRender.id === id) {
        closeModal()
      }
    } catch (err) {
      console.error('Error toggling favorite:', err)
    }
  }"""

content = re.sub(r'const toggleFavorite = async.*?\}', new_toggle_favorite, content, flags=re.DOTALL)

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Library.jsx', 'w') as f:
    f.write(content)
