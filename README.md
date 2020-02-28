# Pimp My PR

A brilliant tool that will pimp your pull requests by collecting and presenting PR statistics.

## PMP-WEB

### Development

- install dependencies with `npm install`
- serve application with `ng serve`

### Build production

- install dependencies `npm install`
- build application `npm run build:pmp-web:prod`

## PMP-API

### Development

- copy `.env-sample` file as `.env` under `libs/server/shared/core/src/lib/config/` directory
- install dependencies with `npm install`
- serve application with `ng serve pmp-api`

### Build production

- copy `.env-sample` file as `.env` under `libs/server/shared/core/src/lib/config/` directory, or provide
  `PMP_API_SERVICE_GITHUB_TOKEN, PMP_API_SERVICE_REPOSITORY_OWNER, PMP_API_SERVICE_REPOSITORY_TITLE`
  environment variables
- install dependencies `npm install`
- build application `npm run build:pmp-api:prod`

## Start a production sandbox

- Build pmp-api and pmp-web as a production
- launch api `npm run run:pmp-api`
- launch frontend `npm run run:pmp-web`


## Production Server setup
- copy `.env-sample` file as `.env` in project root
- fill `.env` file
- run `docker-compose up -d`
