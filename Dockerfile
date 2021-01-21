FROM node:12.16.0-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . ./

USER 1000:1000

EXPOSE 3000
ENTRYPOINT ["/app/node_modules/.bin/probot", "run", "./index.js"]
CMD ["--port=3000", "--webhook-path=/mergeable"]
