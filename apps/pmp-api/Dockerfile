ARG NODE_VERSION=12.16.1
FROM node:${NODE_VERSION}-stretch as modules

WORKDIR /app

COPY angular.json nx.json package.json package-lock.json tsconfig.json ./
COPY ./libs/shared ./libs/shared
COPY ./libs/server ./libs/server
COPY ./apps/pmp-api ./apps/pmp-api

RUN npm ci
RUN npm run build:pmp-api:prod

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY --from=modules /app/dist/apps/pmp-api/main.js main.js

RUN npm ci --prod

EXPOSE 3333

CMD npm run run:pmp-api
