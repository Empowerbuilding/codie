with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'r') as f:
    content = f.read()

content = content.replace('<input\n                      type="text"', '<textarea\n                      rows={1}\n                      style={{ resize: \'none\', whiteSpace: \'nowrap\', overflow: \'hidden\', height: \'54px\' }}')
content = content.replace('<input\n                        type="text"', '<textarea\n                        rows={1}\n                        style={{ resize: \'none\', whiteSpace: \'nowrap\', overflow: \'hidden\', height: \'54px\' }}')

content = content.replace('className="url-input"\n                    />', 'className="url-input"\n                    ></textarea>')
content = content.replace('className="url-input"\n                      />', 'className="url-input"\n                      ></textarea>')

with open('/home/node/.openclaw/workspace/repos/render-tool/src/pages/Home.jsx', 'w') as f:
    f.write(content)
