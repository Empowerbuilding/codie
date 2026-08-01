const fs = require('fs');
const path = '/home/node/.openclaw/workspace/TOOLS.md';
let content = fs.readFileSync(path, 'utf8');

const webhookRow = "| Generate Texture (Albedo) | \`https://n8n.empowerbuilding.ai/webhook/rt-texture-creator\` | \`{ imageUrl, prompt }\` |";

content = content.replace(
  '| Edit / Square Up (Outpaint) |',
  webhookRow + '\n| Edit / Square Up (Outpaint) |'
);

fs.writeFileSync(path, content);
console.log('TOOLS.md updated successfully.');
