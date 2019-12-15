## Server config
| Name  | Default  | Description  |
|---|---|---|
| PORT  | 3000  | Http server port  |
---

## Redis config
| Name  | Default  | Description  |
|---|---|---|
| REDIS_HOST  | localhost | Redis host  |
| REDIS_PORT  | 6379 | Redis port  |
| REDIS_QUEUE_DB  | 1 | Redis database  |
| REDIS_QUEUE_KEY  | queues | Redis prefix key  |
---
=======

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
