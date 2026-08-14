const fs = require('fs');
const file = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

const target = `                      <div className="image-preview" style={{ position: 'relative' }}>
                        <img src={editImageUrl} alt="Preview" style={{ maxHeight: '250px', objectFit: 'contain' }} 
                          onError={(e) => {
                            e.target.style.display = 'none'
                            setEditError('Failed to load image. Please check the URL.')
                          }}
                        />`;
                        
const replacement = `                      <div className="image-preview" style={{ position: 'relative' }}>
                        <img src={editImageUrl} alt="Preview" style={{ maxHeight: '250px', objectFit: 'contain' }} 
                          onError={(e) => {
                            e.target.style.display = 'none'
                            setEditError('Failed to load image. Please check the URL.')
                          }}
                        />
                        {editMaskBase64 && (
                          <img src={editMaskBase64} alt="Mask" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', opacity: 0.5, pointerEvents: 'none' }} />
                        )}`;

if(code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync(file, code);
    console.log('patched mask overlay');
} else {
    console.log('target not found for overlay');
}
