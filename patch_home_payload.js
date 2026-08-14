const fs = require('fs');
const file = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

const target = `const payload = {
        imageUrl: finalImageUrl,
        targetRatio: editTargetRatio,
        expandDirection: editTargetRatio === 'original' ? 'none' : editExpandDirection,
        prompt: editCustomPrompt,
        options: { targetRatio: editTargetRatio, expandDirection: editTargetRatio === 'original' ? 'none' : editExpandDirection },
        profileId: profileId
      }`;
      
const replacement = `const payload = {
        imageUrl: finalImageUrl,
        targetRatio: editTargetRatio,
        expandDirection: editTargetRatio === 'original' ? 'none' : editExpandDirection,
        prompt: editCustomPrompt,
        maskBase64: editMaskBase64,
        options: { targetRatio: editTargetRatio, expandDirection: editTargetRatio === 'original' ? 'none' : editExpandDirection, hasMask: !!editMaskBase64 },
        profileId: profileId
      }`;

if(code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync(file, code);
    console.log('patched payload');
} else {
    console.log('target not found');
}
