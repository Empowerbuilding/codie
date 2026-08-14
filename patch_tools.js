const fs = require('fs');
const file = '/home/node/.openclaw/workspace/TOOLS.md';
let content = fs.readFileSync(file, 'utf8');
if (!content.includes('RT - Image Edit / Outpaint: `8XLUwv88etraqHtR`')) {
    content = content.replace('RT - Exterior Video:', 'RT - Image Edit / Outpaint: `8XLUwv88etraqHtR`\n- RT - Exterior Video:');
    fs.writeFileSync(file, content);
}
console.log('patched TOOLS.md');
