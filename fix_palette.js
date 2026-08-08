const fs = require('fs');
let content = fs.readFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/components/AssetPalette.jsx', 'utf8');

// 1. Fix bucket name
content = content.replace(/\.from\('base_images'\)/g, ".from('renders')");

// 2. Adjust filters logic
content = content.replace(/const filteredAssets = assets\.filter\(asset => \{[\s\S]*?\}\);/, `const filteredAssets = assets.filter(asset => {
    if (filter === 'recent') return true;
    if (filter === 'uploads') return asset.render_type === 'upload';
    if (filter === 'exterior') return asset.render_type === 'exterior';
    if (filter === 'interior') return asset.render_type === 'interior';
    if (filter === 'edit') return asset.render_type === 'edit';
    if (filter === 'remodel') return asset.render_type === 'remodel';
    if (filter === 'texture') return asset.render_type === 'texture';
    return true;
  });`);

// 3. Move filters below upload box, and update filter options
const filtersHtml = `{/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['all', 'uploads', 'renders'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: filter === f ? '#0070f3' : '#333',
                    background: filter === f ? 'rgba(0,112,243,0.15)' : '#111',
                    color: filter === f ? '#fff' : '#aaa',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>`;

const newFiltersHtml = `{/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '5px' }}>
              {['recent', 'uploads', 'exterior', 'interior', 'edit', 'remodel', 'texture'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: filter === f ? '#0070f3' : '#333',
                    background: filter === f ? 'rgba(0,112,243,0.15)' : '#111',
                    color: filter === f ? '#fff' : '#aaa',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>`;

const uploadBoxHtml = `{/* Global Uploader Dropzone */}
            <label 
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '20px', border: '2px dashed', 
                borderColor: isDragOver ? '#0070f3' : '#555', 
                backgroundColor: isDragOver ? 'rgba(0,112,243,0.1)' : '#111',
                borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s',
                minHeight: '100px'
              }}
            >
              {uploading ? (
                <div style={{ color: '#0070f3', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></span>
                  Uploading...
                </div>
              ) : (
                <>
                  <span style={{ fontSize: '24px', color: isDragOver ? '#0070f3' : 'white', transition: 'color 0.2s', marginBottom: '8px' }}>
                    {isDragOver ? '⬇' : '+'}
                  </span>
                  <p style={{ margin: '0', fontSize: '13px', color: '#888', textAlign: 'center', lineHeight: '1.4' }}>
                    {isDragOver ? 'Drop to Upload' : 'Upload or Paste (Ctrl+V)'}
                  </p>
                  <input type="file" style={{ display: 'none' }} onChange={(e) => handleFilesUpload(Array.from(e.target.files))} accept="image/*" multiple />
                </>
              )}
            </label>`;

const headerSection = `<h2 style={{ fontSize: '1.2rem', margin: '0', color: 'white', fontWeight: '600' }}>Asset Palette</h2>`;

// First, remove the filters from their current place
content = content.replace(filtersHtml, "");

// Add default filter
content = content.replace(`const [filter, setFilter] = useState('all');`, `const [filter, setFilter] = useState('recent');`);

// Find the upload box block
const toReplaceBlock = `<div style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h2 style={{ fontSize: '1.2rem', margin: '0', color: 'white', fontWeight: '600' }}>Asset Palette</h2>
            
            
            
            ${uploadBoxHtml}
          </div>`;

const newBlock = `<div style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h2 style={{ fontSize: '1.2rem', margin: '0', color: 'white', fontWeight: '600' }}>Asset Palette</h2>
            
            ${uploadBoxHtml}
            ${newFiltersHtml}
          </div>`;

content = content.replace(toReplaceBlock, newBlock);

fs.writeFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/components/AssetPalette.jsx', content);
console.log("Patched AssetPalette successfully.");
