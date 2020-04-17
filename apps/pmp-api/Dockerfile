ARG NODE_VERSION=12.16.1-stretch
FROM node:${NODE_VERSION} as modules

COPY package.json package-lock.json ./

RUN npm ci

FROM node:${NODE_VERSION}

WORKDIR /app

COPY --from=modules node_modules node_modules

COPY angular.json nx.json package.json package-lock.json tsconfig.json /app/
COPY ./libs/shared /app/libs/shared
COPY ./libs/server /app/libs/server
COPY ./apps/pmp-api /app/apps/pmp-api

RUN npm run build:pmp-api:prod

EXPOSE 3333

CMD npm run run:pmp-api
