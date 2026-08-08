const fs = require('fs');
let content = fs.readFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'utf8');

// The rewrite replaced `<section className="section url-section">` starting tag for exterior/interior
// but we wiped it out without returning `<section className="section url-section">`.
// Look at what we replaced:
// `<h2 className="subtitle-gradient">Exterior 3D Render</h2>`
// The original had `<section className="section url-section">` right before it.
// Oh wait, `replaceUploadBlock` did:
// `content.substring(0, exteriorStartIdx) + generateImagePanel(...) + content.substring(exteriorEndIdx)`
// So `generateImagePanel` returns `div className="image-panel..."` but doesn't have the closing `</section>` 
// because we cut out from `<h2 ... >` to `{/* Checkbox Categories */}`.
// Originally, the `<section>` ended before `{/* Checkbox Categories */}` and we just removed it?
// Let's see original:
// <section className="section url-section">
//   <h2 className="subtitle-gradient">Exterior 3D Render</h2>
//   ...
//   <div className="file-upload-group">...</div>
// </section>
// {/* Original Image Preview */}

// So we deleted the `</section>`!
// Let's add `</section>` right before `{/* Checkbox Categories */}` for both exterior and interior.
// Same for Edit? Edit didn't use `</section>`. Edit used `<div className="card split-card"><div className="card-left">`.

content = content.replace('{/* Checkbox Categories */}', '</section>\n\n              {/* Checkbox Categories */}');
// Do it globally because interior and exterior both have it.
// Oh wait, we replaced it by matching `{/* Checkbox Categories */}`. So let's just insert it.
// Wait, the first replace will do it twice?
// Let's find exactly where we need to fix it.
