const fs = require('fs');
let content = fs.readFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'utf8');

// The exterior dropzone wrapper logic
// We want to replace `<div className="file-upload-group">` up to `</label>` with a drop-target enabled label or div

// For exterior:
const exteriorOld = `<div className="file-upload-group">
                  <label className="file-upload-btn">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleExteriorFileUpload}
                      hidden
                    />
                  </label>`;

const exteriorNew = `<div className="file-upload-group drop-target"
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#0070f3'; }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'transparent'; }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = 'transparent';
                    const url = e.dataTransfer.getData('text/plain');
                    if (url) {
                      setExteriorImageUrl(url);
                      setExteriorImageFile(null);
                      setExteriorError(null);
                      setExteriorShowPreview(true);
                    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      const file = e.dataTransfer.files[0];
                      if (file.type.startsWith('image/')) {
                        setExteriorImageFile(file);
                        setExteriorImageUrl(URL.createObjectURL(file));
                        setExteriorError(null);
                        setExteriorShowPreview(true);
                      }
                    }
                  }}
                  onPaste={(e) => {
                    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                    const items = e.clipboardData.items;
                    for (let i = 0; i < items.length; i++) {
                      if (items[i].type.indexOf('image') !== -1) {
                        const file = items[i].getAsFile();
                        setExteriorImageFile(file);
                        setExteriorImageUrl(URL.createObjectURL(file));
                        setExteriorError(null);
                        setExteriorShowPreview(true);
                        e.preventDefault();
                        break;
                      }
                    }
                  }}
                  style={{ border: '2px dashed transparent', padding: '10px', borderRadius: '8px', transition: 'border-color 0.2s' }}
                >
                  <label className="file-upload-btn" style={{ width: '100%', margin: 0 }}>
                    Upload or Drop Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleExteriorFileUpload}
                      hidden
                    />
                  </label>`;

content = content.replace(exteriorOld, exteriorNew);

// For interior:
const interiorOld = `<div className="file-upload-group">
                  <label className="file-upload-btn">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleInteriorFileUpload}
                      hidden
                    />
                  </label>`;

const interiorNew = `<div className="file-upload-group drop-target"
                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#0070f3'; }}
                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'transparent'; }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.borderColor = 'transparent';
                    const url = e.dataTransfer.getData('text/plain');
                    if (url) {
                      setInteriorImageUrl(url);
                      setInteriorImageFile(null);
                      setInteriorError(null);
                      setInteriorShowPreview(true);
                    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      const file = e.dataTransfer.files[0];
                      if (file.type.startsWith('image/')) {
                        setInteriorImageFile(file);
                        setInteriorImageUrl(URL.createObjectURL(file));
                        setInteriorError(null);
                        setInteriorShowPreview(true);
                      }
                    }
                  }}
                  onPaste={(e) => {
                    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
                    const items = e.clipboardData.items;
                    for (let i = 0; i < items.length; i++) {
                      if (items[i].type.indexOf('image') !== -1) {
                        const file = items[i].getAsFile();
                        setInteriorImageFile(file);
                        setInteriorImageUrl(URL.createObjectURL(file));
                        setInteriorError(null);
                        setInteriorShowPreview(true);
                        e.preventDefault();
                        break;
                      }
                    }
                  }}
                  style={{ border: '2px dashed transparent', padding: '10px', borderRadius: '8px', transition: 'border-color 0.2s' }}
                >
                  <label className="file-upload-btn" style={{ width: '100%', margin: 0 }}>
                    Upload or Drop Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleInteriorFileUpload}
                      hidden
                    />
                  </label>`;

content = content.replace(interiorOld, interiorNew);

fs.writeFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', content);
console.log("Patched Home.jsx drop targets.");
