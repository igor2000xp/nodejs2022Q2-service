import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
// import { LoggingMyService } from './modules/logging/logging-my.service';
// import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoggingMyService } from './modules/logging/logging-my.service';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  // const logger = new Logger('bootstrap');
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const DOC_API = await readFile(
    path.resolve(process.cwd(), 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);

  const config = app.get(ConfigService);
  app.useLogger(new LoggingMyService(config));

  const logger = new LoggingMyService(config);
  logger.setContext(bootstrap.name);

  process.on('uncaughtException', (err: Error) => {
    const errorLog = `Uncaught Exception: ${JSON.stringify(err.stack || err)}`;
    logger.error(errorLog, bootstrap.name);
  });
  process.on('unhandledRejection', (err: Error) => {
    const errorLog = `Unhandled Rejection: ${JSON.stringify(err.stack || err)}`;
    logger.error(errorLog, bootstrap.name);
  });

  await app.listen(PORT);
  logger.log(`
  Application listening port ${PORT}
  `);
}
bootstrap();
