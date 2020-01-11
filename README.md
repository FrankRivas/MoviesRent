<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

## prerequisites

- postman
- npm v6.12.1
- postgresql 11
- pgadmin4 (Optional to see the data in a GUI)

## Installation

- Clone the repository

```bash
$ git clone https://github.com/FrankRivas/MoviesRent.git
```

- Install Dependencies

```bash
$ npm install
```

- Restore the database backup

- Configure .env file on the root directory of the project

## Restoring Database

```bash
psql [DB name] < database/RentMoviesBackup
```

## Running the app

```bash
# development
$ npm run start

# watch mode (Recommended)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Getting tokens

In order to generate a token, you can use users from the database or create a new user

## Documentation

https://documenter.getpostman.com/view/3221284/SWLh77wM

## Test

```bash
# unit tests
$ npm run test (Recommended)

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - Francisco Rivas
