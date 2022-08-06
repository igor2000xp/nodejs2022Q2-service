# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/igor2000xp/nodejs2022Q2-service
```

## Installing NPM modules

```
yarn install
```

## Вимание!

Приложение настроено для работы локально (контейнер nest-js при этом останавливается, а приложение запускается на компьютере start:dev) с базой данных из контейнера postgres. Для того, чтобы приложение запускалось из контейнера, а локальное приложение "работало параллельно" нужно в файле .env заменить строчку:
__DATABASE_URL="postgresql://admin:admin@postgres:5432/nestjs?schema=public"__

т.е. __localhost:5432__ заменить на __postgres:5432__ в этой строке.

## Using .env

to `.env` and enter the number of port.

## Running application

```
npm run start-dev
```

After starting the app on port (4000 as default)

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### For start to create and up containers

```
docker compose up
```

Pull images from Docker Hub

To pull the database

docker push igor2000xp/postgresql

To pull the application

docker push igor2000xp/nodejs2022q2-service_api_container

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
