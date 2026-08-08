const fs = require('fs');
let content = fs.readFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'utf8');

function generateImagePanel(propName, statePrefix, titleStr, includeSectionWrapper = true) {
  const isEdit = statePrefix === 'edit';
  const showPreviewVar = statePrefix + 'ShowPreview';
  const urlVar = statePrefix + 'ImageUrl';
  
  const block = '<div className="image-panel drop-target" \n' +
         '                  tabIndex={0}\n' +
         '                  onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = \'#0070f3\'; }}\n' +
         '                  onDragLeave={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = \'#333\'; }}\n' +
         '                  onDrop={(e) => {\n' +
         '                    e.preventDefault();\n' +
         '                    e.currentTarget.style.borderColor = \'#333\';\n' +
         '                    const url = e.dataTransfer.getData(\'text/plain\');\n' +
         '                    if (url) {\n' +
         '                      set' + propName + 'ImageUrl(url);\n' +
         '                      set' + propName + 'ImageFile(null);\n' +
         '                      set' + propName + 'Error(null);\n' +
         '                      set' + showPreviewVar + '(true);\n' +
         '                    } else if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {\n' +
         '                      const file = e.dataTransfer.files[0];\n' +
         '                      if (file.type.startsWith(\'image/\')) {\n' +
         '                        set' + propName + 'ImageFile(file);\n' +
         '                        set' + propName + 'ImageUrl(URL.createObjectURL(file));\n' +
         '                        set' + propName + 'Error(null);\n' +
         '                        set' + showPreviewVar + '(true);\n' +
         '                      }\n' +
         '                    }\n' +
         '                  }}\n' +
         '                  onPaste={(e) => {\n' +
         '                    if (e.target.tagName === \'INPUT\' || e.target.tagName === \'TEXTAREA\') return;\n' +
         '                    const items = e.clipboardData.items;\n' +
         '                    for (let i = 0; i < items.length; i++) {\n' +
         '                      if (items[i].type.indexOf(\'image\') !== -1) {\n' +
         '                        const file = items[i].getAsFile();\n' +
         '                        set' + propName + 'ImageFile(file);\n' +
         '                        set' + propName + 'ImageUrl(URL.createObjectURL(file));\n' +
         '                        set' + propName + 'Error(null);\n' +
         '                        set' + showPreviewVar + '(true);\n' +
         '                        e.preventDefault();\n' +
         '                        break;\n' +
         '                      }\n' +
         '                    }\n' +
         '                  }}\n' +
         '                  style={{ backgroundColor: \'#111\', padding: \'1.5rem\', borderRadius: \'16px\', border: \'1px solid #333\', outline: \'none\', transition: \'border-color 0.2s\' }}\n' +
         '                >\n' +
         '                  <h3 className="subtitle-gradient" style={{ marginBottom: \'1.5rem\', fontSize: \'1.25rem\' }}>' + titleStr + '</h3>\n' +
         '                  \n' +
         '                  <details className="url-input-details" style={{ marginBottom: \'1rem\' }}><summary style={{ cursor: \'pointer\', color: \'#0070f3\', fontSize: \'0.9rem\', paddingBottom: \'0.5rem\' }}>🔗 Use Image URL</summary>\n' +
         '                    <div className="url-input-group">\n' +
         '                      <input\n' +
         '                        type="url"\n' +
         '                        value={' + urlVar + '.startsWith(\'blob:\') ? \'\' : ' + urlVar + '}\n' +
         '                        onChange={(e) => {\n' +
         '                          set' + propName + 'ImageUrl(e.target.value)\n' +
         '                          set' + propName + 'ImageFile(null)\n' +
         '                          set' + propName + 'Error(null)\n' +
         '                          set' + showPreviewVar + '(true)\n' +
         '                        }}\n' +
         '                        placeholder="Paste image URL here..."\n' +
         '                        className="url-input"\n' +
         '                      />\n' +
         '                    </div>\n' +
         '                  </details>\n' +
         '                  <div className="upload-divider">\n' +
         '                    <span>or</span>\n' +
         '                  </div>\n' +
         '                  <div className="file-upload-group">\n' +
         '                    <label className="file-upload-btn" style={{ display: \'flex\', flexDirection: \'column\', alignItems: \'center\', justifyContent: \'center\', minHeight: \'120px\' }}>\n' +
         '                      <span style={{ fontSize: \'2rem\', marginBottom: \'0.5rem\' }}>📸</span>\n' +
         '                      Upload or Paste Image\n' +
         '                      <input\n' +
         '                        type="file"\n' +
         '                        accept="image/*"\n' +
         '                        onChange={(e) => {\n' +
         '                           const file = e.target.files[0];\n' +
         '                           if (file) {\n' +
         '                             set' + propName + 'ImageFile(file);\n' +
         '                             set' + propName + 'ImageUrl(URL.createObjectURL(file));\n' +
         '                             set' + showPreviewVar + '(true);\n' +
         '                             set' + propName + 'Error(null);\n' +
         '                             ' + (isEdit ? 'setEditEnhancedImage(null);' : '') + '\n' +
         '                           }\n' +
         '                        }}\n' +
         '                        hidden\n' +
         '                      />\n' +
         '                    </label>\n' +
         '                    {' + urlVar + '.startsWith(\'data:\') && (\n' +
         '                      <span className="file-uploaded-indicator">Image uploaded</span>\n' +
         '                    )}\n' +
         '                  </div>\n' +
         '\n' +
         '                  {' + urlVar + ' && (\n' +
         '                    <div className="section preview-section" style={{ marginTop: \'2rem\', padding: 0 }}>\n' +
         '                      <div className="image-preview" style={{ position: \'relative\' }}>\n' +
         '                        <img src={' + urlVar + '} alt="Preview" style={{ maxHeight: \'250px\', objectFit: \'contain\' }} \n' +
         '                          onError={(e) => {\n' +
         '                            e.target.style.display = \'none\'\n' +
         '                            set' + propName + 'Error(\'Failed to load image. Please check the URL.\')\n' +
         '                          }}\n' +
         '                        />\n' +
         '                        <button \n' +
         '                          className="remove-btn" \n' +
         '                          onClick={() => { set' + propName + 'ImageUrl(\'\'); set' + propName + 'ImageFile(null); set' + showPreviewVar + '(false); ' + (isEdit ? 'setEditEnhancedImage(null);' : '') + ' }}\n' +
         '                          style={{ position: \'absolute\', top: \'10px\', right: \'10px\' }}\n' +
         '                        >\n' +
         '                          ✕ Remove\n' +
         '                        </button>\n' +
         '                      </div>\n' +
         '                    </div>\n' +
         '                  )}\n' +
         '                </div>';

  if (includeSectionWrapper) {
    return block + '\n              </section>';
  }
  return block;
}

const exteriorStartIdx = content.indexOf('<h2 className="subtitle-gradient">Exterior 3D Render</h2>');
const exteriorEndIdx = content.indexOf('{/* Checkbox Categories */}', exteriorStartIdx);
if (exteriorStartIdx !== -1 && exteriorEndIdx !== -1) {
  content = content.substring(0, exteriorStartIdx) + 
            generateImagePanel('Exterior', 'exterior', 'Exterior 3D Render Image', true) + 
            '\n\n              ' + content.substring(exteriorEndIdx);
} else { console.log('Failed to patch exterior'); }

const interiorStartIdx = content.indexOf('<h2 className="subtitle-gradient">Interior 3D Render</h2>');
const interiorEndIdx = content.indexOf('{/* Checkbox Categories */}', interiorStartIdx);
if (interiorStartIdx !== -1 && interiorEndIdx !== -1) {
  content = content.substring(0, interiorStartIdx) + 
            generateImagePanel('Interior', 'interior', 'Interior 3D Render Image', true) + 
            '\n\n              ' + content.substring(interiorEndIdx);
} else { console.log('Failed to patch interior'); }

const editSectionStart = content.indexOf('<h2>Edit / Square Up</h2>');
const editOptionsIdx = content.indexOf('{/* Options */}', editSectionStart);
if (editSectionStart !== -1 && editOptionsIdx !== -1) {
  const replaceStr = 
    '<h2>Edit / Square Up</h2>\n' +
    '                  <p className="subtitle" style={{ marginBottom: \'2rem\' }}>Extend an image to a 1:1 ratio without cropping or losing quality.</p>\n' +
    '                  \n' +
    '                  ' + generateImagePanel('Edit', 'edit', 'Base Image', false);
  
  content = content.substring(0, editSectionStart) + replaceStr + '\n\n                  ' + content.substring(editOptionsIdx);
} else { console.log('Failed to patch edit'); }

fs.writeFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', content);
console.log("Patched Interior, Exterior, and Edit blocks.");
