FROM node:24.11-slim

RUN apt-get update && apt-get install -y git curl python3 && \
    rm -rf /var/lib/apt/lists/*

RUN npm install -g openclaw@latest

WORKDIR /home/node
COPY . .

RUN chown -R node:node /home/node

USER node

ENTRYPOINT ["openclaw.mjs"]
CMD ["gateway", "--allow-unconfigured"]
