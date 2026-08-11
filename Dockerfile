# Cloud Run: stateless, streamable HTTP, public ingress with OAuth enforced
# in-app (Claude cannot mint Google IAM tokens, so IAM ingress is unusable).
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build && npm prune --omit=dev

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json roster.json ./
USER node
EXPOSE 8080
CMD ["node", "dist/index.js"]
