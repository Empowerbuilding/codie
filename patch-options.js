const fs = require('fs');
const path = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "const payload = {\n        imageUrl: finalImageUrl,\n        prompt: texturePrompt,\n        profileId: profileId\n      }",
  "const payload = {\n        imageUrl: finalImageUrl,\n        prompt: texturePrompt + ' create a seamless square albedo texture map.',\n        profileId: profileId\n      }"
);

fs.writeFileSync(path, content);
