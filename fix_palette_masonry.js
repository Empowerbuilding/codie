const fs = require('fs');
let content = fs.readFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/components/AssetPalette.jsx', 'utf8');

// Replace the grid container with a CSS columns masonry layout.
// Old: 
// <div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', alignContent: 'start' }}>

const oldGrid = `<div style={{ flex: 1, overflowY: 'auto', padding: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', alignContent: 'start' }}>`;
const newGrid = `<div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
          <div style={{ columnCount: sidebarWidth > 450 ? 3 : sidebarWidth > 250 ? 2 : 1, columnGap: '10px' }}>`;

content = content.replace(oldGrid, newGrid);

// Now replace the mapped asset div.
const oldAssetDiv = `                <div 
                  key={asset.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', imgUrl);
                  }}
                  style={{
                    aspectRatio: '1', backgroundColor: '#222', borderRadius: '8px',
                    backgroundImage: \`url(\${imgUrl})\`, backgroundSize: 'cover', backgroundPosition: 'center',
                    cursor: 'grab', border: '1px solid #333', position: 'relative', overflow: 'hidden'
                  }}
                  title={asset.prompt || 'Asset'}
                >
                  {/* Small tag indicator for render vs upload */}
                  <div style={{
                    position: 'absolute', bottom: '4px', right: '4px', 
                    background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '10px', 
                    padding: '2px 6px', borderRadius: '4px', textTransform: 'capitalize'
                  }}>
                    {asset.render_type || 'render'}
                  </div>
                </div>`;

const newAssetDiv = `                <div 
                  key={asset.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData('text/plain', imgUrl);
                  }}
                  style={{
                    marginBottom: '10px', breakInside: 'avoid',
                    backgroundColor: '#222', borderRadius: '8px',
                    cursor: 'grab', border: '1px solid #333', position: 'relative', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column'
                  }}
                  title={asset.prompt || 'Asset'}
                >
                  <img src={imgUrl} style={{ width: '100%', display: 'block', pointerEvents: 'none' }} alt="Asset" />
                  {/* Small tag indicator for render vs upload */}
                  <div style={{
                    position: 'absolute', bottom: '4px', right: '4px', 
                    background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '10px', 
                    padding: '2px 6px', borderRadius: '4px', textTransform: 'capitalize'
                  }}>
                    {asset.render_type || 'render'}
                  </div>
                </div>`;

content = content.replace(oldAssetDiv, newAssetDiv);

// Close the extra div for masonry
content = content.replace(/<\/div>\n        <\/div>\n      \) : \(/, `</div>\n          </div>\n        </>\n      ) : (`);

// Clean up any potential syntax errors from multiple replace calls if something was already closed
// Actually, let's just do it cleanly:
// Original tail was:
/*
            })}
          </div>
        </>
      ) : (
*/
// New tail should be:
/*
            })}
          </div>
          </div>
        </>
      ) : (
*/
content = content.replace(/            \}\)\}\n          <\/div>\n        <\/>\n      \) : \(/, 
`            })}\n          </div>\n          </div>\n        </>\n      ) : (`);

fs.writeFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/components/AssetPalette.jsx', content);
console.log("Patched AssetPalette masonry successfully.");
