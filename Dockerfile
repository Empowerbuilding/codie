FROM node:24.11-slim

RUN apt-get update && apt-get install -y git curl python3 && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g openclaw@latest

# Copy bundled extensions and skills (not included in npm package)
RUN git clone --depth 1 --single-branch --branch main \
    https://github.com/openclaw/openclaw.git /tmp/openclaw-src && \
    cp -r /tmp/openclaw-src/extensions /usr/local/lib/node_modules/openclaw/ && \
    cp -r /tmp/openclaw-src/skills /usr/local/lib/node_modules/openclaw/ && \
    rm -rf /tmp/openclaw-src

WORKDIR /home/node
COPY . .

RUN chown -R node:node /home/node

USER node

ENTRYPOINT ["openclaw.mjs"]
CMD ["gateway", "--allow-unconfigured"]
