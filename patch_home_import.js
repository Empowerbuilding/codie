const fs = require('fs');
const file = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace("import '../App.css'", "import MaskEditor from '../components/MaskEditor'\nimport '../App.css'");

fs.writeFileSync(file, code);
console.log('patched imports');
