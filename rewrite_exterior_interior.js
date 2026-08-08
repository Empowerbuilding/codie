const fs = require('fs');
let content = fs.readFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'utf8');

// We need to replace the entire exterior dropzone.
// Finding it from `<div className="file-upload-group drop-target"` to `</section>`
const extStart = content.indexOf('<div className="file-upload-group drop-target"');
const intStart = content.indexOf('<div className="file-upload-group drop-target"', extStart + 100);

if (extStart === -1 || intStart === -1) {
  console.log("Could not find the drop targets.");
  process.exit(1);
}

const replaceUploadBlock = (content, prefix) => {
  const PropName = prefix === 'exterior' ? 'Exterior' : 'Interior';
  
  const blockStartString = `<div className="file-upload-group drop-target"`;
  let startIdx = content.indexOf(blockStartString);
  
  // Find the closing of this block - it ends right before `</section>` or `{/* Original Image Preview */}`
  // Because it was originally:
  // </label>
  // {exteriorImageUrl.startsWith('data:') && ( ... )}
  // </div>
  // </section>
  
  const endMarker = `</section>`;
  let sectionEndIdx = content.indexOf(endMarker, startIdx);
  
  const blockToReplace = content.substring(startIdx, sectionEndIdx);

  const newBlock = `<div 
                  className="upload-container drop-target"
                  tabIndex={0}
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#0070f3'; }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = ''; }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = '';
                    const url = e.dataTransfer.getData('text/plain');
                    if (url) {
                      set${PropName}ImageUrl(url);
                      set${PropName}ImageFile(null);
                      set${PropName}Error(null);
                      set${PropName}ShowPreview(true);
                    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      const file = e.dataTransfer.files[0];
                      if (file.type.startsWith('image/')) {
                        set${PropName}ImageFile(file);
                        set${PropName}ImageUrl(URL.createObjectURL(file));
                        set${PropName}Error(null);
                        set${PropName}ShowPreview(true);
                      }
                    }
                  }}
                  onPaste={(e) => {
                    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                    const items = e.clipboardData.items;
                    for (let i = 0; i < items.length; i++) {
                      if (items[i].type.indexOf('image') !== -1) {
                        const file = items[i].getAsFile();
                        set${PropName}ImageFile(file);
                        set${PropName}ImageUrl(URL.createObjectURL(file));
                        set${PropName}Error(null);
                        set${PropName}ShowPreview(true);
                        e.preventDefault();
                        break;
                      }
                    }
                  }}
                >
                  <input
                    type="file"
                    id="${prefix}-upload"
                    accept="image/*"
                    onChange={handle${PropName}FileUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="${prefix}-upload" className="upload-box">
                    <div className="upload-content">
                      <span className="upload-icon">📁</span>
                      <span className="upload-text">Upload or Drop Image</span>
                    </div>
                  </label>
                </div>\n              `;

  return content.replace(blockToReplace, newBlock);
}

content = replaceUploadBlock(content, 'exterior');
content = replaceUploadBlock(content, 'interior');

fs.writeFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', content);
console.log("Patched Interior and Exterior drop blocks.");
