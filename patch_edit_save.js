const fs = require('fs');
const file = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

const target = "await saveRender(profileId, 'edit', finalImageUrl, resultUrl, editCustomPrompt, { targetRatio: editTargetRatio, expandDirection: editExpandDirection })";
const replacement = "await saveRender({ renderType: 'edit', originalImageUrl: finalImageUrl, enhancedImageUrl: resultUrl, prompt: editCustomPrompt, options: { targetRatio: editTargetRatio, expandDirection: editExpandDirection }, metadata: { profile_id: profileId } })";

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync(file, code);
    console.log('Patched edit saveRender');
} else {
    console.log('Target not found');
}
