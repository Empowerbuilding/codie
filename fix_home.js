const fs = require('fs');
let content = fs.readFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'utf8');

// We are going to strictly target the `url-input-group` blocks and change ONLY them.
// We will replace `<div className="url-input-group">` with `<details><summary>...</summary><div className="url-input-group">`
// AND we will replace the `<div className="upload-divider"><span>or</span></div>` with `</details><div className="upload-divider"><span>or</span></div>`

content = content.replace(/<div className="url-input-group">/g, 
  '<details className="url-input-details" style={{ marginBottom: \'1rem\' }}><summary style={{ cursor: \'pointer\', color: \'#0070f3\', fontSize: \'0.9rem\', paddingBottom: \'0.5rem\' }}>🔗 Use Image URL</summary><div className="url-input-group">'
);

// Now we need to close the `</details>` right before `<div className="upload-divider">`
// The upload divider can have different indentations
content = content.replace(/<div className="upload-divider">/g, 
  '</details>\n                  <div className="upload-divider">'
);

fs.writeFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', content);
console.log("Patched correctly.");
