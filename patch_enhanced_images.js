const fs = require('fs');
const file = '/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx';
let code = fs.readFileSync(file, 'utf8');

const newLogic = `      if (renderToLoad.render_type === 'exterior') {
        setActiveTab('exterior');
        setExteriorImageUrl(renderToLoad.original_image_url || '');
        setExteriorShowPreview(!!renderToLoad.original_image_url);
        if (renderToLoad.options) {
          const { projectStyle: loadedStyle, ...checkboxOptions } = renderToLoad.options;
          setExteriorSelectedOptions(checkboxOptions);
          if (loadedStyle) setProjectStyle(loadedStyle);
        }
        setExteriorCustomPrompt(renderToLoad.prompt || '');
        if (renderToLoad.enhanced_image_url) setExteriorEnhancedImage({ url: renderToLoad.enhanced_image_url, id: renderToLoad.id, is_favorited: renderToLoad.is_favorited });
      } else if (renderToLoad.render_type === 'interior') {
        setActiveTab('interior');
        setInteriorImageUrl(renderToLoad.original_image_url || '');
        setInteriorShowPreview(!!renderToLoad.original_image_url);
        if (renderToLoad.options) {
          const { projectStyle: loadedStyle, ...checkboxOptions } = renderToLoad.options;
          setInteriorSelectedOptions(checkboxOptions);
          if (loadedStyle) setProjectStyle(loadedStyle);
        }
        setInteriorCustomPrompt(renderToLoad.prompt || '');
        if (renderToLoad.enhanced_image_url) setInteriorEnhancedImage({ url: renderToLoad.enhanced_image_url, id: renderToLoad.id, is_favorited: renderToLoad.is_favorited });
      } else if (renderToLoad.render_type === 'remodel') {
        setActiveTab('remodel');
        setRemodelBaseImageUrl(renderToLoad.original_image_url || '');
        if (renderToLoad.options?.styleImageUrl) setRemodelStyleImageUrl(renderToLoad.options.styleImageUrl);
        setRemodelCustomPrompt(renderToLoad.prompt || '');
        if (renderToLoad.options?.baseGeometryStrength !== undefined) setRemodelBaseGeometryStrength(renderToLoad.options.baseGeometryStrength);
        if (renderToLoad.options?.styleGeometryStrength !== undefined) setRemodelStyleGeometryStrength(renderToLoad.options.styleGeometryStrength);
        if (renderToLoad.options?.textureStrength !== undefined) setRemodelTextureStrength(renderToLoad.options.textureStrength);
        if (renderToLoad.options?.geometryPrompt) setRemodelGeometryPrompt(renderToLoad.options.geometryPrompt);
        if (renderToLoad.enhanced_image_url) setRemodelEnhancedImage({ url: renderToLoad.enhanced_image_url, id: renderToLoad.id, is_favorited: renderToLoad.is_favorited });
      } else if (renderToLoad.render_type === 'texture') {
        setActiveTab('texture');
        setTextureImageUrl(renderToLoad.original_image_url || '');
        setTexturePrompt(renderToLoad.prompt || '');
        if (renderToLoad.enhanced_image_url) setTextureResultUrl({ url: renderToLoad.enhanced_image_url, id: renderToLoad.id, is_favorited: renderToLoad.is_favorited });
      } else if (renderToLoad.render_type === 'edit') {
        setActiveTab('edit');
        setEditImageUrl(renderToLoad.original_image_url || '');
        setEditCustomPrompt(renderToLoad.prompt || '');
        if (renderToLoad.options?.targetRatio) setEditTargetRatio(renderToLoad.options.targetRatio);
        if (renderToLoad.options?.expandDirection) setEditExpandDirection(renderToLoad.options.expandDirection);
        setEditShowPreview(!!renderToLoad.original_image_url);
        if (renderToLoad.enhanced_image_url) setEditEnhancedImage({ url: renderToLoad.enhanced_image_url, id: renderToLoad.id, is_favorited: renderToLoad.is_favorited });
      }

      if (location.state && location.state.intent === 'edit') {
        setActiveTab('edit');
        setEditImageUrl(renderToLoad.enhanced_image_url || renderToLoad.original_image_url || '');
        setEditShowPreview(true);
      }`;

const targetBlockRegex = /if \(renderToLoad\.render_type === 'exterior'\) \{[\s\S]*?if \(location\.state && location\.state\.intent === 'edit'\) \{[\s\S]*?setEditShowPreview\(true\);\n      \}/;

code = code.replace(targetBlockRegex, newLogic);
fs.writeFileSync(file, code);
console.log('patched enhanced images in load render');
