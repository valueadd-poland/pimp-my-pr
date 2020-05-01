ARG NODE_VERSION=12.16.1
FROM node:${NODE_VERSION}-stretch as app

WORKDIR /app

RUN npm i -g pkg@4.4.8

COPY angular.json nx.json package.json package-lock.json tsconfig.json /app/
COPY ./libs/shared /app/libs/shared
COPY ./libs/server /app/libs/server
COPY ./apps/pmp-api /app/apps/pmp-api

RUN npm ci
RUN npm run build:pmp-api:prod

FROM node:${NODE_VERSION}-slim

WORKDIR /app

RUN npm i -g pm2@4.4.0

COPY --from=app /app/dist/apps/pmp-api/main main

EXPOSE 3333

CMD pm2 start main --no-daemon
