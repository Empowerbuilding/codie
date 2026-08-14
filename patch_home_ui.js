const fs = require('fs');
const file = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

const target = `                  {editImageUrl && (
                    <div className="section preview-section" style={{ marginTop: '2rem', padding: 0 }}>
                      <div className="image-preview" style={{ position: 'relative' }}>
                        <img src={editImageUrl} alt="Preview" style={{ maxHeight: '250px', objectFit: 'contain' }} 
                          onError={(e) => {
                            e.target.style.display = 'none'
                            setEditError('Failed to load image. Please check the URL.')
                          }}
                        />
                        <button 
                          className="remove-btn" 
                          onClick={() => { setEditImageUrl(''); setEditImageFile(null); setEditShowPreview(false); setEditEnhancedImage(null); }}
                          style={{ position: 'absolute', top: '10px', right: '10px' }}
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  )}`;

const replacement = `                  {editImageUrl && (
                    <div className="section preview-section" style={{ marginTop: '2rem', padding: 0 }}>
                      <div className="image-preview" style={{ position: 'relative' }}>
                        <img src={editImageUrl} alt="Preview" style={{ maxHeight: '250px', objectFit: 'contain' }} 
                          onError={(e) => {
                            e.target.style.display = 'none'
                            setEditError('Failed to load image. Please check the URL.')
                          }}
                        />
                        <button 
                          className="remove-btn" 
                          onClick={() => { setEditImageUrl(''); setEditImageFile(null); setEditShowPreview(false); setEditEnhancedImage(null); }}
                          style={{ position: 'absolute', top: '10px', right: '10px' }}
                        >
                          ✕ Remove
                        </button>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'center' }}>
                        <button 
                          onClick={() => setShowMaskEditor(true)} 
                          className="action-btn secondary"
                          style={{ fontSize: '0.9rem', padding: '8px 16px' }}
                        >
                          🖍️ Draw Edit Mask
                        </button>
                        {editMaskBase64 && (
                          <button 
                            onClick={() => setEditMaskBase64(null)} 
                            className="action-btn secondary" 
                            style={{ fontSize: '0.9rem', padding: '8px 16px', background: 'rgba(255,0,0,0.1)', color: '#ff4444', borderColor: '#ff4444' }}
                          >
                            ✕ Clear Mask
                          </button>
                        )}
                      </div>
                    </div>
                  )}`;

if(code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync(file, code);
    console.log('patched ui');
} else {
    console.log('target not found for UI patch');
}
