const fs = require('fs');
const path = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let content = fs.readFileSync(path, 'utf8');

const tabContentInjection = `
          {/* ============ TEXTURE CREATOR TAB ============ */}
          {activeTab === 'texture' && (
            <div className="tab-content">
              <section className="section">
                <h2 className="subtitle-gradient">Texture Creator</h2>
                <p style={{ color: '#888', marginBottom: '1.5rem', textAlign: 'center' }}>Upload a reference image and describe which part to convert into a seamless 1:1 albedo texture.</p>
                
                <div className="image-panel" 
                    tabIndex={0}
                    onPaste={(e) => {
                      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                      const items = e.clipboardData.items;
                      for (let i = 0; i < items.length; i++) {
                        if (items[i].type.indexOf('image') !== -1) {
                          const file = items[i].getAsFile();
                          setTextureImageFile(file);
                          setTextureImageUrl(URL.createObjectURL(file));
                          setTextureError(null);
                          e.preventDefault();
                          break;
                        }
                      }
                    }}
                    style={{ backgroundColor: '#111', padding: '1.5rem', borderRadius: '16px', border: '1px solid #333', outline: 'none', marginBottom: '2rem' }}
                >
                  <h3 className="subtitle-gradient" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>1. Reference Image (Optional but recommended)</h3>
                  
                  <div className="url-input-group">
                    <input
                      type="url"
                      value={textureImageUrl.startsWith('blob:') ? '' : textureImageUrl}
                      onChange={(e) => {
                        setTextureImageUrl(e.target.value)
                        setTextureImageFile(null)
                        setTextureError(null)
                      }}
                      placeholder="Paste image URL..."
                      className="url-input"
                    />
                  </div>
                  <div className="upload-divider">
                    <span>or</span>
                  </div>
                  <div className="file-upload-group">
                    <label className="file-upload-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
                      <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📸</span>
                      Upload or Paste Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleTextureFileUpload}
                        hidden
                      />
                    </label>
                    {textureImageUrl.startsWith('data:') && (
                      <span className="file-uploaded-indicator">Image uploaded</span>
                    )}
                  </div>

                  {textureImageUrl && (
                    <div className="section preview-section" style={{ marginTop: '2rem', padding: 0 }}>
                      <div className="image-preview" style={{ position: 'relative' }}>
                        <img src={textureImageUrl} alt="Reference" style={{ maxHeight: '250px', objectFit: 'contain' }} />
                        <button 
                          className="remove-btn" 
                          onClick={() => { setTextureImageUrl(''); setTextureImageFile(null); }}
                          style={{ position: 'absolute', top: '10px', right: '10px' }}
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="prompt-section" style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#ccc' }}>2. Texture Description</label>
                  <textarea
                    className="prompt-textarea"
                    placeholder="e.g. 'Use the wood grain from the bottom left corner' or 'Dark reclaimed oak wood planks, seamless, square...'"
                    value={texturePrompt}
                    onChange={(e) => setTexturePrompt(e.target.value)}
                    style={{ width: '100%', minHeight: '80px', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '1rem', color: 'white' }}
                  />
                </div>

                <button 
                  className="generate-btn" 
                  onClick={handleTextureGenerate}
                  disabled={textureIsLoading}
                  style={{ width: '100%' }}
                >
                  {textureIsLoading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <div className="spinner"></div> Generating...
                    </span>
                  ) : 'Generate Texture 🎨'}
                </button>
                
                {textureError && <div className="error-message" style={{ marginTop: '1rem' }}>{textureError}</div>}
              </section>

              {textureResultUrl && (
                <section className="section result-section">
                  <h2 className="subtitle-gradient">Result</h2>
                  <div className="result-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="result-image-wrapper">
                      <img src={textureResultUrl} alt="Generated Texture" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
                    </div>
                    <div className="result-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                      <a href={textureResultUrl} download="texture.png" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>⬇️</span> Download Texture
                      </a>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
`;

content = content.replace(
  '{/* ============ EXTERIOR TAB ============ */}',
  tabContentInjection + '\n          {/* ============ EXTERIOR TAB ============ */}'
);

fs.writeFileSync(path, content);
console.log('Patch applied successfully.');
