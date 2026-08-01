const fs = require('fs');
const path = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "let resultUrl = data[0]?.url || data?.url;\n      if (!resultUrl && typeof data === 'string' && data.startsWith('http')) resultUrl = data;\n      if (!resultUrl && data && data.enhanced_image_url) resultUrl = data.enhanced_image_url;",
  "let resultUrl = data[0]?.url || data?.url;\n      if (!resultUrl && typeof data === 'string' && data.startsWith('http')) resultUrl = data;\n      if (!resultUrl && data && data.enhanced_image_url) resultUrl = data.enhanced_image_url;\n      if (!resultUrl && data && data.enhancedImage) resultUrl = data.enhancedImage;"
);

fs.writeFileSync(path, content);
