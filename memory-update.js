const fs = require('fs');
const path = '/home/node/.openclaw/workspace/MEMORY.md';
let content = fs.readFileSync(path, 'utf8');

const todayStr = '2026-08-01';
const newEntry = `### 2026-08-01\n- **Render Tool:** Added new "Texture Creator" tab integrated with n8n webhook (\`rt-texture-creator\`) using Gemini flash to generate seamless albedo textures. Updated version to v1.1.5.1.\n- **Files Modified:** \`src/pages/Home.jsx\`, \`src/App.jsx\`, \`TOOLS.md\`.\n\n`;

if (!content.includes('### ' + todayStr)) {
  content = content.replace('## SECTION D — RECENT SESSION NOTES (Trimmable — max 20k chars, trim entries >60 days old)', '## SECTION D — RECENT SESSION NOTES (Trimmable — max 20k chars, trim entries >60 days old)\n\n' + newEntry);
  fs.writeFileSync(path, content);
}
