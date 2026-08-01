const fs = require('fs');
const origWf = JSON.parse(fs.readFileSync('/tmp/workflow.json', 'utf8'));

const newWf = {
  name: 'RT - Texture Creator',
  nodes: origWf.nodes.map(node => {
    if (node.type === 'n8n-nodes-base.webhook') {
      node.parameters.path = 'rt-texture-creator';
    }
    return node;
  }),
  connections: origWf.connections,
  settings: origWf.settings
};

fs.writeFileSync('/tmp/new_wf4.json', JSON.stringify(newWf));
