import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as path from 'path';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
// import { LoggingMyService } from './modules/logging/logging-my.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const logger = new Logger('bootstrap');
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule, {
    // logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    // logger: false,
    // logger: console,
    // logger: new LoggingMyService(),
  });

  const DOC_API = await readFile(
    path.resolve(process.cwd(), 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(DOC_API);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
  logger.log(`
  Application listening port ${PORT}
  `);
}
bootstrap();
