const fs = require('fs');
const file = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

const target = "const [editCustomPrompt, setEditCustomPrompt] = useState('')";
const replacement = target + "\n  const [editMaskBase64, setEditMaskBase64] = useState(null)\n  const [showMaskEditor, setShowMaskEditor] = useState(false)";

code = code.replace(target, replacement);

fs.writeFileSync(file, code);
console.log('patched state');
