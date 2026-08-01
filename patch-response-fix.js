const fs = require('fs');
const path = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `      if (Array.isArray(data) && data[0]?.error) throw new Error(data[0].error)

      let resultUrl = data[0]?.url || data?.url;
      if (!resultUrl && typeof data === 'string' && data.startsWith('http')) resultUrl = data;
      if (!resultUrl && data && data.enhanced_image_url) resultUrl = data.enhanced_image_url;
      
      if (!resultUrl) throw new Error('Invalid response format from server.')`;

const replacement = `      if (Array.isArray(data) && data[0]?.error) throw new Error(data[0].error)

      let resultUrl = data[0]?.url || data?.url;
      if (!resultUrl && typeof data === 'string' && data.startsWith('http')) resultUrl = data;
      if (!resultUrl && data && data.enhanced_image_url) resultUrl = data.enhanced_image_url;
      if (!resultUrl && data && data.enhancedImage) resultUrl = data.enhancedImage;
      
      if (!resultUrl) throw new Error('Invalid response format from server.')`;

content = content.replace(targetStr, replacement);
fs.writeFileSync(path, content);
