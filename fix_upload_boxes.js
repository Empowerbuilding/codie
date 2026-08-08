const fs = require('fs');
let content = fs.readFileSync('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'utf8');

// We are going to replace Edit, Exterior, and Interior dropzones with the same `image-panel drop-target` design.

// Helper to replace the entire upload block
function replaceUploadBlock(content, toolType, toolName, Title) {
  // toolType: 'edit', 'exterior', 'interior'
  const PropName = toolType === 'edit' ? 'Edit' : toolType === 'exterior' ? 'Exterior' : 'Interior';
  const fileUploadHandler = \`handle\${PropName}FileUpload\`;
  const imageUrlState = \`\${toolType}ImageUrl\`;
  const imageFileState = \`\${toolType}ImageFile\`;
  const imageErrorState = \`\${toolType}Error\`;
  const showPreviewState = \`\${toolType}ShowPreview\`;

  // Find the block starting with `<div className="upload-container drop-target"` for Edit
  // Or the `<details className="url-input-details"` and its parent container for Exterior/Interior
  
  // For Edit, there's no title inside the dropzone in the original, so we'll just wrap the whole thing inside the card-left.
  // Wait, Edit is inside a split-card. Let's just find the `upload-container` for Edit:
  let startIdx, endMarker, sectionEndIdx, blockToReplace;

  if (toolType === 'edit') {
    startIdx = content.indexOf(\`<div \n                    className="upload-container drop-target"\`);
    if(startIdx === -1) startIdx = content.indexOf(\`<div className="upload-container drop-target"\`);
    endMarker = \`</div>\n                  </details>\`; // wait, edit doesn't have details? Let's check edit
    // Edit doesn't have the details toggle for URL? Wait, I patched all URLs. Let's check Edit's URL input.
  }
}

// Actually, I can just use regex or exact replacement for the blocks. Let's see the current state of Edit:
