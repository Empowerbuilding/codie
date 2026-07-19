FROM node:24.11-slim

RUN apt-get update && apt-get install -y git curl python3 \
    && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update && apt-get install -y gh \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g openclaw@2026.5.18

# Copy bundled extensions and skills (not included in npm package)
RUN git clone --depth 1 --single-branch --branch main \
    https://github.com/openclaw/openclaw.git /tmp/openclaw-src \
    && cp -r /tmp/openclaw-src/extensions /usr/local/lib/node_modules/openclaw/ \
    && cp -r /tmp/openclaw-src/skills /usr/local/lib/node_modules/openclaw/ \
    && rm -rf /tmp/openclaw-src

# Create the OpenClaw app structure at /app (expected location)
RUN mkdir -p /app \
    && cp -r /usr/local/lib/node_modules/openclaw/dist /app/dist \
    && cp -r /usr/local/lib/node_modules/openclaw/node_modules /app/node_modules \
    && cp -r /usr/local/lib/node_modules/openclaw/skills /app/skills \
    && cp /usr/local/lib/node_modules/openclaw/openclaw.mjs /app/ \
    && cp /usr/local/lib/node_modules/openclaw/package.json /app/

WORKDIR /home/node
COPY . .

RUN chown -R node:node /home/node

USER node

ENTRYPOINT ["openclaw"]
CMD ["gateway", "--allow-unconfigured"]
