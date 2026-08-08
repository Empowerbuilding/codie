const fs = require('fs');
let content = fs.readFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'utf8');

// We want to wrap the <div className="url-input-group"> with a native <details>
// Actually, regex replacing might be hard. Let's use simple string replacements for each one.

const replacements = [
  {
    find: `<div className="url-input-group">
                    <input
                      type="url"
                      value={editImageUrl.startsWith('blob:') ? '' : editImageUrl}`,
    replace: `<details className="url-input-details" style={{ marginBottom: '10px' }}>
                    <summary style={{ cursor: 'pointer', color: '#0070f3', fontSize: '0.9rem', marginBottom: '10px' }}>🔗 Use Image URL</summary>
                    <div className="url-input-group">
                      <input
                        type="url"
                        value={editImageUrl.startsWith('blob:') ? '' : editImageUrl}`
  },
  {
    find: `<div className="url-input-group">
                    <input
                      type="url"
                      value={textureImageUrl.startsWith('blob:') ? '' : textureImageUrl}`,
    replace: `<details className="url-input-details" style={{ marginBottom: '10px' }}>
                    <summary style={{ cursor: 'pointer', color: '#0070f3', fontSize: '0.9rem', marginBottom: '10px' }}>🔗 Use Image URL</summary>
                    <div className="url-input-group">
                      <input
                        type="url"
                        value={textureImageUrl.startsWith('blob:') ? '' : textureImageUrl}`
  },
  {
    find: `<div className="url-input-group">
                  <input
                    type="url"
                    value={exteriorImageUrl.startsWith('blob:') ? '' : exteriorImageUrl}`,
    replace: `<details className="url-input-details" style={{ marginBottom: '10px' }}>
                  <summary style={{ cursor: 'pointer', color: '#0070f3', fontSize: '0.9rem', marginBottom: '10px' }}>🔗 Use Image URL</summary>
                  <div className="url-input-group">
                    <input
                      type="url"
                      value={exteriorImageUrl.startsWith('blob:') ? '' : exteriorImageUrl}`
  },
  {
    find: `<div className="url-input-group">
                  <input
                    type="url"
                    value={interiorImageUrl.startsWith('blob:') ? '' : interiorImageUrl}`,
    replace: `<details className="url-input-details" style={{ marginBottom: '10px' }}>
                  <summary style={{ cursor: 'pointer', color: '#0070f3', fontSize: '0.9rem', marginBottom: '10px' }}>🔗 Use Image URL</summary>
                  <div className="url-input-group">
                    <input
                      type="url"
                      value={interiorImageUrl.startsWith('blob:') ? '' : interiorImageUrl}`
  },
  {
    find: `<div className="url-input-group">
                      <input
                        type="url"
                        value={remodelBaseImageUrl.startsWith('blob:') ? '' : remodelBaseImageUrl}`,
    replace: `<details className="url-input-details" style={{ marginBottom: '10px' }}>
                      <summary style={{ cursor: 'pointer', color: '#0070f3', fontSize: '0.9rem', marginBottom: '10px' }}>🔗 Use Image URL</summary>
                      <div className="url-input-group">
                        <input
                          type="url"
                          value={remodelBaseImageUrl.startsWith('blob:') ? '' : remodelBaseImageUrl}`
  },
  {
    find: `<div className="url-input-group">
                      <input
                        type="url"
                        value={remodelStyleImageUrl.startsWith('blob:') ? '' : remodelStyleImageUrl}`,
    replace: `<details className="url-input-details" style={{ marginBottom: '10px' }}>
                      <summary style={{ cursor: 'pointer', color: '#0070f3', fontSize: '0.9rem', marginBottom: '10px' }}>🔗 Use Image URL</summary>
                      <div className="url-input-group">
                        <input
                          type="url"
                          value={remodelStyleImageUrl.startsWith('blob:') ? '' : remodelStyleImageUrl}`
  }
];

// Close the details tag by finding the matching `</div>\n                  <div className="upload-divider">`
// We'll just replace the `upload-divider` with the closing `</details>` and maybe "or".
const uploadDividerFind = `</div>
                  <div className="upload-divider">
                    <span>or</span>
                  </div>`;
const uploadDividerFind2 = `</div>
                    <div className="upload-divider">
                      <span>or</span>
                    </div>`;
                    
content = content.replace(new RegExp(uploadDividerFind.replace(/[.*+?^$|{}()[\\]\\\\]/g, '\\\\$&'), 'g'), `</div>\n                  </details>`);
content = content.replace(new RegExp(uploadDividerFind2.replace(/[.*+?^$|{}()[\\]\\\\]/g, '\\\\$&'), 'g'), `</div>\n                    </details>`);

// Now run the first replacements
replacements.forEach(r => {
  content = content.replace(r.find, r.replace);
});

fs.writeFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', content);
console.log("Patched URL inputs successfully.");
