<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Solution diagram

[A quick introduction to clean architecture](https://www.freecodecamp.org/news/a-quick-introduction-to-clean-architecture-990c014448d2/)

![Solution diagram](https://cdn-media-1.freecodecamp.org/images/oVVbTLR5gXHgP8Ehlz1qzRm5LLjX9kv2Zri6)

### Structure

```
.
├── src
│   ├── app
│   │   ├── auth
│   │   │   └── *.strategy.ts
│   │   │   └── *.guard.ts
│   │   ├── controllers
│   │   │   └── *.controller.ts
│   │   ├── documentation
│   │   │   └── *.body.ts
│   │   ├── events
│   │   │   └── *.gateway.ts
│   │   ├── exception.filters
│   │   │   └── *.filter.ts
│   │   ├── modules
│   │   │   └── *.module.ts
│   │   └── *.application.ts
│   ├── core
│   |   ├── common
│   |   │   ├── adapters
│   |   │   │   └── usecase
|   │   |   │       └── *.adapter.ts
│   |   │   ├── codes
│   |   │   │   └── *.code.ts
│   |   │   ├── constants
│   |   │   │   └── *.constants.*.ts
│   |   │   ├── enums
│   |   │   │   └── order-status.*.ts
│   |   │   │   └── user-types.*.ts
│   |   │   ├── exceptions
|   │   |   │   ├── api.response
|   |   │   |   │   └── *.ts
|   │   |   │   └── *.ts
│   |   │   ├── types
│   |   │   │   └── *types.ts
│   |   │   ├── usecase
│   |   │   │   └── base.usecase.ts
│   |   │   └── utils
|   │   |       ├── class.validator
|   |   │       │   └── *.ts
│   |   │       └── *.ts
|   |   ├── domain
│   |   │   ├── entities
|   |   |   |   ├── types
|   │   |   │   │   └── *.payload.ts
│   |   │   │   └── *.entity.ts
│   |   │   ├── ports
|   |   |   |   ├── auth
|   │   |   │   |   └── *.port.ts
|   |   |   |   ├── encryption
|   │   |   │   │   └── *.port.ts
|   |   |   |   ├── external
|   │   |   │   │   └── *.port.ts
|   |   |   |   ├── mailer
|   │   |   │   │   └── *.port.ts
|   |   |   |   ├── persistence
|   │   |   │   │   └── *.port.ts
│   |   │   │   └── usecase.ts
|   |   |   |   |   ├── user
|   │   |   │   │   │   └── *.port.ts
|   │   |   │   │   └── *.port.ts
│   |   │   └── usecase
│   |   │       └── *.usecase.ts
|   |   ├── dtos
|   |   |   └── *.dto.ts
|   |   └── services
|   |       └── *.usecase.ts
│   ├── infrastructure
│   │   ├── adapters
│   |   │   ├── auth
│   |   │   │   └── *.adapter.ts
│   |   │   ├── encryption
│   |   │   │   └── *.adapter.ts
│   |   │   ├── external
│   |   │   │   └── *.adapter.ts
│   |   │   ├── mailer
│   |   │   │   └── *.adapter.ts
|   │   │   ├── persistence
|   │   │   │   └── mongoose
|   |   |   |       ├── mappers
|   |   │   |       │   └── *.mapper.ts
│   |   │   |       ├── repositories
|   |   │   |       │   └── *.adapter.ts
|   │   |   │       └── schemas
|   |   │   |           └── *.schema.ts
|   │   │   └── usecase
|   │   │       └── cart
|   │   │           └── *.adapter.ts
|   │   │       └── item
|   │   │           └── *.adapter.ts
|   │   │       └── message
|   │   │           └── *.adapter.ts
|   │   │       └── order
|   │   │           └── *.adapter.ts
|   │   │       └── product
|   │   │           └── *.adapter.ts
|   │   │       └── user
|   │   │           └── *.adapter.ts
│   ├── main.ts
├── test
│   ├── common
│   │   ├── env
|   |   │   └── *.test
|   │   └── jest-setup-file.ts
│   ├── unit
│   └── jest-e2e.json
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
└── tech-market-firebase-adminsdk.json

```

### Description of the layers

#### APP

This layer is responsible for exposing the application services as resources implementing a REST design.

#### CORE

This layer contains all the business logic to save and retrieve endorsement, also exposes the data repository interfaces and the validations on these.

### INFRASTRUCTURE

It implements the technical capabilities required by the application and core layers. For example, the implementation of persistence to database
