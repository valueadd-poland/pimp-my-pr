ARG NODE_VERSION=12.16.1-stretch
FROM node:${NODE_VERSION} as modules

COPY package.json package-lock.json ./

RUN npm ci

FROM node:${NODE_VERSION} as build-stage

WORKDIR /app

COPY --from=modules node_modules node_modules

COPY angular.json nx.json package.json package-lock.json tsconfig.json /app/
COPY ./libs/shared /app/libs/shared
COPY ./libs/pmp-web /app/libs/pmp-web
COPY ./apps/pmp-web /app/apps/pmp-web
COPY ./scripts /app/scripts
COPY ./.env /app/.env

RUN npm run init
RUN npm run build:pmp-web:prod

FROM nginx:1.17-alpine

RUN apk add --no-cache bash

COPY apps/pmp-web/docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY apps/pmp-web/docker/nginx/pimp.conf /etc/nginx/conf.d/pimp.conf

RUN rm -rf /usr/share/nginx/html/* && rm /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/dist/apps/pmp-web/ /usr/share/nginx/html

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
