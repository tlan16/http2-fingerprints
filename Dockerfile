FROM node:22-alpine AS node-base
FROM node-base AS build-stage

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

RUN npm run build

FROM node-base AS development-stage
WORKDIR /app
COPY --from=build-stage /app /app
ENTRYPOINT []
CMD ["npm", "run", "dev"]

FROM node-base AS production-stage
WORKDIR /app
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/server-cert.pem /app/
COPY --from=build-stage /app/server-key.pem /app/

ENTRYPOINT []
CMD ["node", "dist/main.js"]
