const fs = require('fs');
const file = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

// Fix typos
code = code.replace(/setexteriorShowPreview/g, 'setExteriorShowPreview');
code = code.replace(/seteditShowPreview/g, 'setEditShowPreview');

// Fix load render logic
const newLogic = `      } else if (renderToLoad.render_type === 'interior') {
        setActiveTab('interior');
        setInteriorImageUrl(renderToLoad.original_image_url || '');
        setInteriorShowPreview(!!renderToLoad.original_image_url);
        if (renderToLoad.options) {
          const { projectStyle: loadedStyle, ...checkboxOptions } = renderToLoad.options;
          setInteriorSelectedOptions(checkboxOptions);
          if (loadedStyle) setProjectStyle(loadedStyle);
        }
        setInteriorCustomPrompt(renderToLoad.prompt || '');
      } else if (renderToLoad.render_type === 'remodel') {
        setActiveTab('remodel');
        setRemodelBaseImageUrl(renderToLoad.original_image_url || '');
        if (renderToLoad.options?.styleImageUrl) setRemodelStyleImageUrl(renderToLoad.options.styleImageUrl);
        setRemodelCustomPrompt(renderToLoad.prompt || '');
        if (renderToLoad.options?.baseGeometryStrength !== undefined) setRemodelBaseGeometryStrength(renderToLoad.options.baseGeometryStrength);
        if (renderToLoad.options?.styleGeometryStrength !== undefined) setRemodelStyleGeometryStrength(renderToLoad.options.styleGeometryStrength);
        if (renderToLoad.options?.textureStrength !== undefined) setRemodelTextureStrength(renderToLoad.options.textureStrength);
        if (renderToLoad.options?.geometryPrompt) setRemodelGeometryPrompt(renderToLoad.options.geometryPrompt);
      } else if (renderToLoad.render_type === 'texture') {
        setActiveTab('texture');
        setTextureImageUrl(renderToLoad.original_image_url || '');
        setTexturePrompt(renderToLoad.prompt || '');
      } else if (renderToLoad.render_type === 'edit') {
        setActiveTab('edit');
        setEditImageUrl(renderToLoad.enhanced_image_url || renderToLoad.original_image_url || '');
        setEditCustomPrompt(renderToLoad.prompt || '');
        if (renderToLoad.options?.targetRatio) setEditTargetRatio(renderToLoad.options.targetRatio);
        if (renderToLoad.options?.expandDirection) setEditExpandDirection(renderToLoad.options.expandDirection);
        setEditShowPreview(true);
      }

      if (location.state && location.state.intent === 'edit') {
        setActiveTab('edit');
        setEditImageUrl(renderToLoad.enhanced_image_url || renderToLoad.original_image_url || '');
        setEditShowPreview(true);
      }`;

code = code.replace(/      \} else if \(renderToLoad\.render_type === 'interior'\) \{[\s\S]*?setEditShowPreview\(true\);\n      \}/, newLogic);

fs.writeFileSync(file, code);
console.log('patched');
