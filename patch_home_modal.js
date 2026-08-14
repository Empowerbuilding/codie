const fs = require('fs');
const file = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

const target = `      <footer className="footer">
        <p>Powered by AI Image Enhancement</p>
      </footer>
    </div>
    </div>
  )
}`;

const replacement = `      {showMaskEditor && editImageUrl && (
        <MaskEditor 
          imageUrl={editImageUrl}
          onSave={(base64) => {
            setEditMaskBase64(base64);
            setShowMaskEditor(false);
          }}
          onClose={() => setShowMaskEditor(false)}
        />
      )}
      <footer className="footer">
        <p>Powered by AI Image Enhancement</p>
      </footer>
    </div>
    </div>
  )
}`;

if(code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync(file, code);
    console.log('patched modal');
} else {
    console.log('target not found for modal patch');
}
