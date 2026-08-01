const fs = require('fs');
const path = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let content = fs.readFileSync(path, 'utf8');

// The state injection I used previously had:
// const [textureResultUrl, setTextureResultUrl] = useState(null)
// Let's modify it so we can use toggleFavoriteHome which expects an object with `.url` and `.is_favorited`.

const targetStr = `setTextureResultUrl(resultUrl)`;
const replacement = `setTextureResultUrl({ url: resultUrl, is_favorited: false })`;

content = content.replace(targetStr, replacement);

const targetHtml = `              {textureResultUrl && (
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
              )}`;

const replacementHtml = `              {textureResultUrl && (
                <section className="section result-section mt-8">
                  <h3 className="subtitle-gradient">Texture Result</h3>
                  <div className="result-container" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333', marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="image-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '512px' }}>
                      <img src={textureResultUrl.url || textureResultUrl} alt="Generated Texture" className="enhanced-image" style={{ aspectRatio: '1/1', width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
                      <button 
                        className={\`heart-btn \${textureResultUrl.is_favorited ? 'active' : ''}\`} 
                        onClick={() => toggleFavoriteHome(
                          typeof textureResultUrl === 'string' ? { url: textureResultUrl, is_favorited: false } : textureResultUrl, 
                          setTextureResultUrl, 
                          'texture', 
                          textureImageUrl, 
                          texturePrompt, 
                          {}
                        )}
                        style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', borderRadius: '20px', padding: '8px 16px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, fontWeight: 'bold' }}
                      >
                        {textureResultUrl.is_favorited ? '✅ Saved' : '💾 Save to Library'}
                      </button>
                    </div>
                    
                    <div className="result-actions" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                      <button 
                        onClick={() => handleDownload(textureResultUrl.url || textureResultUrl, 'texture.jpg')}
                        className="action-btn primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <span>⬇️</span> Download Texture
                      </button>
                    </div>
                  </div>
                </section>
              )}`;

content = content.replace(targetHtml, replacementHtml);

fs.writeFileSync(path, content);
